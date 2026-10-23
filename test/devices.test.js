const test = require('node:test');
const assert = require('node:assert');

const api = require('../src/api');
const { runWithLanguage } = require('../src/Dictionarys/Dictionary');
const onListHandler = require('../src/handlers/onList');
const { selectDevice } = require('../src/handlers/onDevice');
const onCallBackQueryHandler = require('../src/callbacks/callbackQueryHandler');
const ES = require('../src/Dictionarys/ES');

const pairings = (n) => Array.from({ length: n }, (_, i) => ({ deviceId: 'D' + i, tag: 'Cargador ' + String(i).padStart(2, '0') }));

function fakeBot() {
  return {
    sent: [],
    edited: [],
    sendMessage(chatId, text, opts) { this.sent.push({ text, opts }); return Promise.resolve({}); },
    editMessageReplyMarkup(markup) { this.edited.push(markup); return Promise.resolve(true); },
    answerCallbackQuery() { return Promise.resolve(true); },
  };
}
const msg = (chatId) => ({ chat: { id: chatId }, message_id: 1, from: { language_code: 'es' } });

test('teclado de cargadores paginado', () => {
  const list = pairings(29);
  const first = onListHandler.devicesKeyboard(list, 0).inline_keyboard;
  assert.strictEqual(first.length, 9); // 8 cargadores + navegación
  assert.deepStrictEqual(first[0], [{ text: '🔌 Cargador 00 (D0)', callback_data: 'dev:D0' }]);
  assert.deepStrictEqual(first[8].map((b) => b.text), ['1/4', '➡️']);

  const last = onListHandler.devicesKeyboard(list, 3).inline_keyboard;
  assert.strictEqual(last.length, 6); // 5 cargadores + navegación
  assert.deepStrictEqual(last[5].map((b) => b.callback_data), ['devpage:2', 'noop']);

  // Pocos cargadores: sin fila de navegación
  assert.strictEqual(onListHandler.devicesKeyboard(pairings(3), 0).inline_keyboard.length, 3);
  // Página fuera de rango
  assert.deepStrictEqual(onListHandler.devicesKeyboard(list, 99), onListHandler.devicesKeyboard(list, 3));
});

test('/list envía un único mensaje con botones', async () => {
  api.getToken = async () => 'token';
  api.getPairings = async () => pairings(12);
  const bot = fakeBot();
  await runWithLanguage(msg(10), () => onListHandler(bot, msg(10)));
  assert.strictEqual(bot.sent.length, 1);
  assert.strictEqual(bot.sent[0].text, ES.ChooseDevice);
  assert.strictEqual(bot.sent[0].opts.reply_markup.inline_keyboard.length, 9);
});

test('no se puede elegir un cargador que no es del usuario', async () => {
  api.getPairings = async () => pairings(2);
  let saved = null;
  api.updateUserData = async (chatId, token, deviceId) => { saved = deviceId; return true; };
  const bot = fakeBot();
  const ok = await runWithLanguage(msg(11), () => selectDevice(bot, 11, 'token', 'AJENO'));
  assert.strictEqual(ok, false);
  assert.strictEqual(saved, null);
  assert.strictEqual(bot.sent[0].text, ES.AddDeviceKO + 'AJENO');
});

test('elegir un cargador con el botón', async () => {
  api.getToken = async () => 'token';
  api.getPairings = async () => pairings(2);
  let saved = null;
  api.updateUserData = async (chatId, token, deviceId, tag) => { saved = [deviceId, tag]; return true; };
  const bot = fakeBot();
  const callback = { id: 'q', data: 'dev:D1', message: msg(12), from: { language_code: 'es' } };
  await runWithLanguage(callback, () => onCallBackQueryHandler(bot, callback));
  assert.deepStrictEqual(saved, ['D1', 'Cargador 01']);
  assert.strictEqual(bot.sent[0].text, ES.AddDeviceOK + 'Cargador 01 (D1)');
});

test('cambiar de página edita el mismo mensaje', async () => {
  api.getToken = async () => 'token';
  api.getPairings = async () => pairings(20);
  const bot = fakeBot();
  const callback = { id: 'q', data: 'devpage:1', message: msg(13), from: { language_code: 'es' } };
  await runWithLanguage(callback, () => onCallBackQueryHandler(bot, callback));
  assert.strictEqual(bot.sent.length, 0);
  assert.strictEqual(bot.edited.length, 1);
  assert.deepStrictEqual(bot.edited[0].inline_keyboard.at(-1).map((b) => b.text), ['⬅️', '2/3', '➡️']);
});
