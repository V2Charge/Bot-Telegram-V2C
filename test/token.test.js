const test = require('node:test');
const assert = require('node:assert');

const api = require('../src/api');
const { runWithLanguage } = require('../src/Dictionarys/Dictionary');
const { onTokenHandler } = require('../src/handlers/onToken');
const ES = require('../src/Dictionarys/ES');

function fakeBot() {
  return {
    sent: [],
    deleted: [],
    sendMessage(chatId, text) { this.sent.push(text); return Promise.resolve({}); },
    deleteMessage(chatId, messageId) { this.deleted.push(messageId); return Promise.resolve(true); },
  };
}
const msg = { chat: { id: 7 }, message_id: 99, from: { language_code: 'es' } };

test('el mensaje con el token se borra del chat', async () => {
  api.addToken = async () => true;
  const bot = fakeBot();
  const result = await runWithLanguage(msg, () => onTokenHandler(bot, msg, ['/token abc ', 'abc ']));
  assert.strictEqual(result, true);
  assert.deepStrictEqual(bot.deleted, [99]);
  assert.deepStrictEqual(bot.sent, [ES.TokenMessageDeleted, ES.TokenOK]);
});

test('también se borra si el token no es válido', async () => {
  api.addToken = async () => false;
  const bot = fakeBot();
  const result = await runWithLanguage(msg, () => onTokenHandler(bot, msg, ['/token xyz', 'xyz']));
  assert.strictEqual(result, false);
  assert.deepStrictEqual(bot.deleted, [99]);
  assert.ok(bot.sent.includes(ES.TokenKO));
});

test('sin token solo se muestra la ayuda', async () => {
  const bot = fakeBot();
  const result = await runWithLanguage(msg, () => onTokenHandler(bot, msg, ['/token', undefined]));
  assert.strictEqual(result, false);
  assert.deepStrictEqual(bot.deleted, []);
  assert.deepStrictEqual(bot.sent, [ES.TokenHelp + ES.TokenHelpUrl]);
});
