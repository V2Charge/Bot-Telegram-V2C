const api = require("../api");

function onChargingStatus(bot, callbackqueryId, msg, token, deviceId) {
  bot.answerCallbackQuery(callbackqueryId).then(async () => {
    bot.sendMessage(msg.chat.id, languageCode.Charging)
    var currentstatecharge = await api.currentstatecharge(token, deviceId)
    if (currentstatecharge != null) {
      var currentHousePower = currentstatecharge.house_power;
      var photovoltaic_on = currentstatecharge.photovoltaic_on;
      var sun_power = currentstatecharge.sun_power;
      var power = currentstatecharge.power;
      var energy = currentstatecharge.energy;
      await bot.sendMessage(msg.chat.id, languageCode.ChargingInformation)
      if (Number(power) > 0) {
        await bot.sendMessage(msg.chat.id, "⚡ " + power + " KW⚡")
      }
      await bot.sendMessage(msg.chat.id, "⚡🚘 " + energy + " KWh⚡")
      if (Number(currentHousePower) > 0) {
        await bot.sendMessage(msg.chat.id, languageCode.CurrentHousePower + "\n"+ "⚡ " + currentHousePower + " KW ⚡")
      }
      if (String(photovoltaic_on) === "1" && Number(sun_power) > 0) {
        await bot.sendMessage(msg.chat.id, "☀️🏠 " + sun_power + " KW⚡")
      }
    }
  });
}

function onSuccess(bot, callbackqueryId, msg, reported, token, deviceId) {
  var connected = reported.connected;
  if (connected == "0") {
    bot.answerCallbackQuery(callbackqueryId).then(() => bot.sendMessage(msg.chat.id, languageCode.Disconnected));
    return;
  }
  var programed = reported.programed
  var locked = reported.locked;
  if (locked == "1") {
    bot.answerCallbackQuery(callbackqueryId).then(() => {
      bot.sendMessage(msg.chat.id, languageCode.Locked)
      if (programed == "1") {
        bot.sendMessage(msg.chat.id, languageCode.Programed)
      }
    });
    return;
  }
  var pause = reported.pause

  if (pause == "1") {
    bot.answerCallbackQuery(callbackqueryId).then(() => {
      bot.sendMessage(msg.chat.id, languageCode.Paused)
      if (programed == "1") {
        bot.sendMessage(msg.chat.id, languageCode.Programed)
      }
    });
    return;
  }
  var status = reported.charge_state

  switch (status) {
    case "0":
      bot.answerCallbackQuery(callbackqueryId).then(() => {
        bot.sendMessage(msg.chat.id, languageCode.StandBy)
        if (programed == "1") {
          bot.sendMessage(msg.chat.id, languageCode.Programed)
        }
      });
      return;
    case "1":
      bot.answerCallbackQuery(callbackqueryId).then(async () => {
        await bot.sendMessage(msg.chat.id, languageCode.Waiting)
        if (programed == "1") {
          bot.sendMessage(msg.chat.id, languageCode.Programed)
        }
      });
      return;
    case "2":
      onChargingStatus(bot, callbackqueryId, msg, token, deviceId);
      return;
    default:
      bot.answerCallbackQuery(callbackqueryId).catch(() => {});
  }
}

function onError(bot, callbackqueryId, msg) {
  // var languageCode = getLanguage(msg)
  bot.answerCallbackQuery(callbackqueryId).then(() => bot.sendMessage(msg.chat.id, languageCode.ErrorOperation));
}


async function statusCallback(bot, callbackqueryId, msg, token, deviceId) {
  var reported = await api.reported(token, deviceId)
  if (reported == null) {
    onError(bot, callbackqueryId, msg)
    return;
  }
  onSuccess(bot, callbackqueryId, msg, reported, token, deviceId);
}

module.exports = statusCallback