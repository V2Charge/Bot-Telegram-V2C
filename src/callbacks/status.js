const api = require("../api");
const { statusText, isCharging } = require("../format");

function refreshKeyboard() {
  return { inline_keyboard: [[{ text: languageCode.Refresh, callback_data: "StatusRefresh" }]] };
}

// Estado del cargador en un único mensaje con botón "Actualizar".
// Con refresh = true se edita el mensaje existente en lugar de enviar otro.
async function statusCallback(bot, callbackqueryId, msg, token, deviceId, refresh = false) {
  const reported = await api.reported(token, deviceId)
  if (reported == null) {
    await bot.answerCallbackQuery(callbackqueryId).catch(() => {});
    bot.sendMessage(msg.chat.id, languageCode.ErrorOperation);
    return;
  }
  const current = isCharging(reported) ? await api.currentstatecharge(token, deviceId) : null;
  const text = statusText(languageCode, deviceId, reported, current);
  await bot.answerCallbackQuery(callbackqueryId).catch(() => {});

  if (refresh) {
    await bot.editMessageText(text, {
      chat_id: msg.chat.id,
      message_id: msg.message_id,
      reply_markup: refreshKeyboard(),
    }).catch(() => {}); // "message is not modified" si nada ha cambiado
    return;
  }
  await bot.sendMessage(msg.chat.id, text, { reply_markup: refreshKeyboard() });
}

module.exports = statusCallback
