const V2CTelegramBot = require('./V2CTelegramBot');

process.on('unhandledRejection', (reason) => {
  console.error('Unhandled rejection', reason);
});

const telegramToken = process.env.BOT_TOKEN;
if (!telegramToken) {
  console.error('BOT_TOKEN no está definido');
  process.exit(1);
}

const bot = new V2CTelegramBot(telegramToken);
bot.init()
