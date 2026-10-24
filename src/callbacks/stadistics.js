const api = require("../api");
const { statisticsText } = require("../format");

async function stadisticsCallback(bot, callbackqueryId, msg, token, deviceId) {
  const result = await api.stadistics(token, deviceId)
  await bot.answerCallbackQuery(callbackqueryId).catch(() => {});
  if (!result.ok) {
    bot.sendMessage(msg.chat.id, result.status === 403 ? languageCode.StatsOwnerOnly : languageCode.ErrorOperation);
    return;
  }
  await bot.sendMessage(msg.chat.id, statisticsText(languageCode, result.data));
}

module.exports = stadisticsCallback
