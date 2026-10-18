const test = require('node:test');
const assert = require('node:assert');
const EventEmitter = require('node:events');

// Bot de Telegram falso: registra los comandos y guarda los mensajes enviados
class FakeTelegramBot extends EventEmitter {
  constructor() {
    super();
    this.commands = [];
    this.sent = [];
  }
  onText(regex, handler) { this.commands.push({ regex, handler }); }
  setMyCommands() { return Promise.resolve(true); }
  sendMessage(chatId, text) { this.sent.push({ chatId, text }); return Promise.resolve({}); }
  answerCallbackQuery() { return Promise.resolve(true); }
  receive(msg) {
    for (const { regex, handler } of this.commands) {
      const match = regex.exec(msg.text);
      if (match) return handler(msg, match);
    }
  }
}
require('node-telegram-bot-api');
require.cache[require.resolve('node-telegram-bot-api')].exports = FakeTelegramBot;

const api = require('../src/api');
const V2CTelegramBot = require('../src/V2CTelegramBot');
const ES = require('../src/Dictionarys/ES');
const DE = require('../src/Dictionarys/DE');
const EN = require('../src/Dictionarys/EN');

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
const message = (chatId, language_code, text) => ({ chat: { id: chatId }, from: { language_code }, text });

test('dos usuarios a la vez reciben cada uno su idioma', async () => {
  // El usuario 1 tiene una respuesta lenta de la API y el 2 una rápida,
  // así las peticiones se intercalan
  api.getToken = async (chatId) => { await delay(chatId === 1 ? 40 : 5); return 'token'; };
  api.getUserInfo = async (chatId) => { await delay(chatId === 1 ? 40 : 5); return { deviceId: 'ABC' }; };

  const bot = new V2CTelegramBot('fake');
  await bot.init();
  await Promise.all([
    bot.bot.receive(message(1, 'es', '/info')),
    bot.bot.receive(message(2, 'de', '/info')),
  ]);
  await delay(100);

  assert.deepStrictEqual(bot.bot.sent, [
    { chatId: 2, text: DE.ChooseInfo },
    { chatId: 1, text: ES.ChooseInfo },
  ]);
});

test('variantes regionales e idiomas sin traducción', async () => {
  const { getLanguage } = { getLanguage: require('../src/Dictionarys/Dictionary') };
  assert.strictEqual(getLanguage({ from: { language_code: 'pt-br' } }), require('../src/Dictionarys/PT'));
  assert.strictEqual(getLanguage({ from: { language_code: 'ca' } }), ES);
  assert.strictEqual(getLanguage({ from: { language_code: 'ja' } }), EN);
  assert.strictEqual(getLanguage({ from: {} }), EN);
});

test('los comandos solo se activan con el comando exacto', async () => {
  const bot = new V2CTelegramBot('fake');
  await bot.init();
  const matches = (text) => bot.bot.commands.filter(({ regex }) => regex.test(text)).length;
  assert.strictEqual(matches('/set'), 1);
  assert.strictEqual(matches('/set@v2charge_bot'), 1);
  assert.strictEqual(matches('/settings'), 0);
  assert.strictEqual(matches('hola /set'), 0);
  assert.strictEqual(bot.bot.commands.find(({ regex }) => regex.test('/token abc'))?.regex.exec('/token abc')[1], 'abc');
});
