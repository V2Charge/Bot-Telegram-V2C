const api = require("../api");
const { statisticsText } = require("../format");

async function stadisticsCallback(bot, callbackqueryId, msg, token, deviceId) {
  const stadistics = await api.stadistics(token, deviceId)
  await bot.answerCallbackQuery(callbackqueryId).catch(() => {});
  if (stadistics == null) {
    bot.sendMessage(msg.chat.id, languageCode.ErrorOperation);
    return;
  }
  await bot.sendMessage(msg.chat.id, statisticsText(languageCode, stadistics));
}

module.exports = stadisticsCallback
