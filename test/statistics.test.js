const test = require('node:test');
const assert = require('node:assert');

const api = require('../src/api');
const { runWithLanguage } = require('../src/Dictionarys/Dictionary');
const stadisticsCallback = require('../src/callbacks/stadistics');
const ES = require('../src/Dictionarys/ES');

let response;
api._clients.cloud.defaults.adapter = async (config) => {
  if (response.status >= 400) {
    const err = new Error('HTTP ' + response.status);
    err.response = { status: response.status };
    err.config = config;
    throw err;
  }
  return { data: response.data, status: 200, statusText: 'OK', headers: {}, config };
};

async function press() {
  const sent = [];
  const bot = { answerCallbackQuery: async () => true, sendMessage: async (chatId, text) => { sent.push(text); return {}; } };
  const msg = { chat: { id: 1 }, from: { language_code: 'es' } };
  await runWithLanguage(msg, () => stadisticsCallback(bot, 'q', msg, 'clave', 'ABC'));
  return sent;
}

test('propietario: muestra las últimas cargas', async () => {
  response = { status: 200, data: [{ startChargeDate: '2026-10-18T12:13:00', endChargeDate: '2026-10-18T12:18:00', energy: 0.3, cost: 0.01, coCost: 0.08 }] };
  const [text] = await press();
  assert.ok(text.startsWith(ES.LastSessions));
});

test('invitado de un cargador compartido (403): mensaje claro', async () => {
  response = { status: 403 };
  assert.deepStrictEqual(await press(), [ES.StatsOwnerOnly]);
});

test('otros errores: mensaje genérico', async () => {
  response = { status: 500 };
  assert.deepStrictEqual(await press(), [ES.ErrorOperation]);
});
