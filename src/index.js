const Promise = require('bluebird');
const V2CTelegramBot = require('./V2CTelegramBot');



Promise.config({
  cancellation: true
});

process.on('unhandledRejection', (reason) => {
  console.error('Unhandled rejection', reason);
});

const telegramToken = process.env.BOT_TOKEN;
const bot = new V2CTelegramBot(telegramToken);
bot.init()


