const test = require('node:test');
const assert = require('node:assert');

const api = require('../src/api');
const { runWithLanguage } = require('../src/Dictionarys/Dictionary');
const { handleControls, intensityKeyboard, solarKeyboard } = require('../src/callbacks/controls');
const ES = require('../src/Dictionarys/ES');

// Captura las peticiones HTTP en lugar de enviarlas
const requests = [];
api._clients.cloud.defaults.adapter = async (config) => {
  requests.push({ method: config.method, url: config.url, params: config.params, apikey: config.headers.apikey });
  return { data: {}, status: 200, statusText: 'OK', headers: {}, config };
};

function fakeBot() {
  return {
    sent: [], menus: [],
    answerCallbackQuery: async () => true,
    sendMessage: async function (chatId, text) { this.sent.push(text); return {}; },
    editMessageText: async function (text, opts) { this.menus.push({ text, keyboard: opts.reply_markup }); return {}; },
  };
}
const msg = { chat: { id: 1 }, message_id: 5, from: { language_code: 'es' } };
const press = (bot, data) => runWithLanguage(msg, () => handleControls(bot, 'q', msg, 'clave', 'ABC', data));

test('cada botón llama al endpoint documentado con sus parámetros', async () => {
  const cases = [
    ['int:16', '/device/intensity', { deviceId: 'ABC', value: '16' }, ES.IntensitySet.replace('{value}', 16)],
    ['fv:1', '/device/chargefvmode', { deviceId: 'ABC', value: '1' }, ES.SolarModeSet.replace('{value}', ES.FvMode1)],
    ['dyn:0', '/device/dynamic', { deviceId: 'ABC', value: '0' }, ES.DynamicDisabled],
  ];
  for (const [data, url, params, reply] of cases) {
    requests.length = 0;
    const bot = fakeBot();
    assert.strictEqual(await press(bot, data), true);
    assert.deepStrictEqual(requests, [{ method: 'post', url, params, apikey: 'clave' }], data);
    assert.deepStrictEqual(bot.sent, [reply], data);
  }
});

test('valores manipulados en el botón no llegan a la API', async () => {
  for (const data of ['int:99', 'int:abc', 'int:5', 'fv:7', 'fv:-1', 'dyn:2', 'int:']) {
    requests.length = 0;
    const bot = fakeBot();
    assert.strictEqual(await press(bot, data), true, data);
    assert.strictEqual(requests.length, 0, data);
    assert.deepStrictEqual(bot.sent, [], data);
  }
});

test('si la API falla se avisa al usuario', async () => {
  const original = api._clients.cloud.defaults.adapter;
  api._clients.cloud.defaults.adapter = async (config) => {
    const err = new Error('fail'); err.response = { status: 500 }; err.config = config; throw err;
  };
  const bot = fakeBot();
  await press(bot, 'int:16');
  assert.deepStrictEqual(bot.sent, [ES.ErrorOperation]);
  api._clients.cloud.defaults.adapter = original;
});

test('otros botones no son de este menú', async () => {
  assert.strictEqual(await press(fakeBot(), 'StatusInfo'), false);
  assert.strictEqual(await press(fakeBot(), 'PauseMode'), false);
});

test('menú de intensidad: limitado al rango del cargador y marca la actual', () => {
  runWithLanguage(msg, () => {
    const rows = intensityKeyboard({ min_car_int: '6', max_car_int: '16', intensity: '10' }).inline_keyboard;
    const buttons = rows.flat().map((b) => b.text);
    assert.deepStrictEqual(buttons, ['6 A', '8 A', '✅ 10 A', '13 A', '16 A', ES.Back]);
  });
});

test('menú solar marca el modo y el control dinámico actuales', () => {
  runWithLanguage(msg, () => {
    const texts = solarKeyboard({ charge_fv_mode: '2', dynamic: '1' }).inline_keyboard.flat().map((b) => b.text);
    assert.deepStrictEqual(texts, [ES.FvMode0, ES.FvMode1, '✅ ' + ES.FvMode2, '✅ ' + ES.DynamicOn, ES.DynamicOff, ES.Back]);
  });
});

test('abrir un submenú edita el mensaje del menú', async () => {
  api.reported = async () => ({ min_car_int: '6', max_car_int: '32', intensity: '32' });
  const bot = fakeBot();
  await press(bot, 'menu:intensity');
  await press(bot, 'menu:set');
  assert.deepStrictEqual(bot.menus.map((m) => m.text), [ES.ChooseIntensity, ES.ChooseInfo]);
  assert.strictEqual(bot.sent.length, 0);
});
