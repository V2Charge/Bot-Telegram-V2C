const api = require("../api");
const getLanguage = require("../Dictionarys/Dictionary");

function onSuccess(bot, callbackqueryId, msg, currentstatecharge) {
  var currentHousePower = currentstatecharge.house_power;
  var photovoltaic_on = currentstatecharge.photovoltaic_on;
  var sun_power = currentstatecharge.sun_power;
  bot.answerCallbackQuery(callbackqueryId).then(async () => {
    await bot.sendMessage(msg.chat.id, languageCode.CurrentHousePower)

    if (currentHousePower) {
      await bot.sendMessage(msg.chat.id, "⚡ " + currentHousePower + " KW ⚡")

      if (photovoltaic_on = "1" && sun_power != "0.00") {
        await bot.sendMessage(msg.chat.id, "☀️🏠 " + currentHousePower + " KW⚡")
      }
    }
  }
  );
}

function onError(bot, callbackqueryId, msg) {
  bot.answerCallbackQuery(callbackqueryId).then(() => bot.sendMessage(msg.chat.id, languageCode.ErrorOperation));
}


async function houseIntensityCallback(bot, callbackqueryId, msg, token, deviceId) {
  var currentstatecharge = await api.currentstatecharge(token, deviceId)
  if (currentstatecharge == null) {
    onError(bot, callbackqueryId, msg)
    return;
  }
  onSuccess(bot, callbackqueryId, msg, currentstatecharge);
}

module.exports = houseIntensityCallback