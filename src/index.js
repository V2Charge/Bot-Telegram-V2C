const V2CTelegramBot = require('./V2CTelegramBot');
const logger = require('./logger');

process.on('unhandledRejection', (reason) => {
  logger.error('Unhandled rejection', reason);
});

const telegramToken = process.env.BOT_TOKEN;
if (!telegramToken) {
  logger.error('BOT_TOKEN no está definido');
  process.exit(1);
}

const bot = new V2CTelegramBot(telegramToken);
bot.init().then(() => logger.info('Bot iniciado'))
