const Promise = require('bluebird');
const { TOKEN_PRD } = require('./config');
const V2CTelegramBot = require('./V2CTelegramBot');



Promise.config({
  cancellation: true
});

const telegramToken = TOKEN_PRD;
const bot = new V2CTelegramBot(telegramToken);
bot.init()


