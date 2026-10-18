const api = require("../api");

function dateDiff(date1, date2) {
  var diff = {}
  var tmp = date2 - date1;

  tmp = Math.floor(tmp / 1000);
  diff.sec = tmp % 60;

  tmp = Math.floor((tmp - diff.sec) / 60);
  diff.min = tmp % 60;

  tmp = Math.floor((tmp - diff.min) / 60);
  diff.hour = tmp % 24;

  tmp = Math.floor((tmp - diff.hour) / 24);
  diff.day = tmp;

  return diff;
}

function onSuccess(bot, callbackqueryId, msg, stadistics) {
  bot.answerCallbackQuery(callbackqueryId).then(async () => {
    for (const element of stadistics) {
      const startTime = element.startChargeDate;
      const endTime = element.endChargeDate;
      const StartHour = startTime.slice(11, 16);
      const Start = startTime.slice(0, 10);
      const diff = dateDiff(new Date(startTime), new Date(endTime));
      const timingCharging = diff.hour + "\th\t" + diff.min + "\tm\t" + diff.sec + "\ts"
      await bot.sendMessage(msg.chat.id, languageCode.Start + "\t\t" + Start + "\t\t" + StartHour + "\n"
        + languageCode.TimingCharging + "\t\t" + timingCharging + "\n"
        + languageCode.Energy + "\t\t" + element.energy + "KWh" + "\n"
        + languageCode.Cost + "\t\t" + element.cost + "\t€" + "\n"
        + languageCode.CoCost + "\t\t" + element.coCost + "\tKg/CO2")
    }
  });
}

function onError(bot, callbackqueryId, msg) {
  // var languageCode = getLanguage(msg)
  bot.answerCallbackQuery(callbackqueryId).then(() => bot.sendMessage(msg.chat.id, languageCode.ErrorOperation));
}


async function stadisticsCallback(bot, callbackqueryId, msg, token, deviceId) {
  var stadistics = await api.stadistics(token, deviceId)
  if (stadistics == null) {
    onError(bot, callbackqueryId, msg)
    return;
  }
  onSuccess(bot, callbackqueryId, msg, stadistics);
}

module.exports = stadisticsCallback