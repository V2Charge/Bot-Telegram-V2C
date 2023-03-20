const api = require("../api");

function onSuccess(bot, callbackqueryId, msg) {
  bot.answerCallbackQuery(callbackqueryId).then(() => bot.sendMessage(msg.chat.id, "👌"))
}

function onError(bot, callbackqueryId, msg) {
  bot.answerCallbackQuery(callbackqueryId).then(() => bot.sendMessage(msg.chat.id, languageCode.ErrorOperation));
}


async function pauseCallback(bot, callbackqueryId, msg, token, deviceId) {
  var result = await api.pauseCharger(token, deviceId)
  if (!result) {
    onError(bot, callbackqueryId, msg)
    return;
  }
  onSuccess(bot, callbackqueryId, msg);
}

module.exports = pauseCallback