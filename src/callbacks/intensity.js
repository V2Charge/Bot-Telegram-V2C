const api = require("../api");

function onSuccess(bot, callbackqueryId, msg, reported) {
  var intensity = reported.intensity;
  bot.answerCallbackQuery(callbackqueryId).then(() => bot.sendMessage(msg.chat.id, "⚡" + intensity + " A⚡"));
}

function onError(bot, callbackqueryId, msg) {
  bot.answerCallbackQuery(callbackqueryId).then(() => bot.sendMessage(msg.chat.id, languageCode.ErrorOperation));
}


async function intensityCallback(bot, callbackqueryId, msg, token, deviceId) {
  var reported = await api.reported(token, deviceId)
  if (reported == null) {
    onError(bot, callbackqueryId, msg)
    return;
  }
  onSuccess(bot, callbackqueryId, msg, reported);
}

module.exports = intensityCallback