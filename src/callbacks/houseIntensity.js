const api = require("../api");
const { num } = require("../format");

async function houseIntensityCallback(bot, callbackqueryId, msg, token, deviceId) {
  const current = await api.currentstatecharge(token, deviceId)
  await bot.answerCallbackQuery(callbackqueryId).catch(() => {});
  if (current == null) {
    bot.sendMessage(msg.chat.id, languageCode.ErrorOperation);
    return;
  }
  const lines = [languageCode.CurrentHousePower, `⚡ ${num(current.house_power, 2)} kW`];
  if (String(current.photovoltaic_on) === "1" && Number(current.sun_power) > 0) {
    lines.push(`☀️ ${languageCode.SolarLabel}: ${num(current.sun_power, 2)} kW`);
  }
  await bot.sendMessage(msg.chat.id, lines.join("\n"));
}

module.exports = houseIntensityCallback
