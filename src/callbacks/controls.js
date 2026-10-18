const api = require("../api");

// Valores que ofrecen los botones. Los datos de un botón los puede enviar
// cualquier cliente, así que se validan siempre contra estas listas.
const INTENSITIES = [6, 8, 10, 13, 16, 20, 25, 32];
const FV_MODES = [0, 1, 2];

function setKeyboard() {
  return {
    inline_keyboard: [
      [{ text: languageCode.PauseMode, callback_data: "PauseMode" }, { text: languageCode.ResumeMode, callback_data: "ResumeMode" }],
      [{ text: languageCode.LockMode, callback_data: "LockMode" }, { text: languageCode.UnLockMode, callback_data: "UnLockMode" }],
      [{ text: languageCode.IntensityMenu, callback_data: "menu:intensity" }],
      [{ text: languageCode.SolarMenu, callback_data: "menu:solar" }],
    ],
  };
}

const back = () => [{ text: languageCode.Back, callback_data: "menu:set" }];
const mark = (selected, text) => (selected ? "✅ " + text : text);
const fvModeName = (mode) => languageCode["FvMode" + mode];

function intensityKeyboard(reported) {
  const min = Number(reported && reported.min_car_int) || INTENSITIES[0];
  const max = Number(reported && reported.max_car_int) || INTENSITIES[INTENSITIES.length - 1];
  const current = Number(reported && reported.intensity);
  const values = INTENSITIES.filter((a) => a >= min && a <= max);
  const rows = [];
  for (let i = 0; i < values.length; i += 4) {
    rows.push(values.slice(i, i + 4).map((a) => ({ text: mark(a === current, a + " A"), callback_data: "int:" + a })));
  }
  rows.push(back());
  return { inline_keyboard: rows };
}

function solarKeyboard(reported) {
  const mode = Number(reported && reported.charge_fv_mode);
  const dynamic = String(reported && reported.dynamic) === "1";
  return {
    inline_keyboard: [
      ...FV_MODES.map((m) => [{ text: mark(m === mode, fvModeName(m)), callback_data: "fv:" + m }]),
      [{ text: mark(dynamic, languageCode.DynamicOn), callback_data: "dyn:1" }, { text: mark(!dynamic, languageCode.DynamicOff), callback_data: "dyn:0" }],
      back(),
    ],
  };
}

// Cambia el mensaje del menú por otro menú, sin llenar el chat de mensajes
function showMenu(bot, msg, text, keyboard) {
  return bot.editMessageText(text, { chat_id: msg.chat.id, message_id: msg.message_id, reply_markup: keyboard })
    .catch(() => bot.sendMessage(msg.chat.id, text, { reply_markup: keyboard }));
}

async function done(bot, msg, ok, text) {
  await bot.sendMessage(msg.chat.id, ok ? text : languageCode.ErrorOperation);
}

const fill = (template, value) => template.replace("{value}", value);

// Devuelve true si el botón pertenece a estos menús
async function handleControls(bot, callbackqueryId, msg, token, deviceId, data) {
  const [kind, raw] = data.split(":");
  const value = Number(raw);
  const answer = () => bot.answerCallbackQuery(callbackqueryId).catch(() => {});

  switch (kind) {
    case "menu":
      await answer();
      if (raw === "set") return showMenu(bot, msg, languageCode.ChooseInfo, setKeyboard()).then(() => true);
      if (raw === "intensity" || raw === "solar") {
        const reported = await api.reported(token, deviceId);
        if (raw === "intensity") await showMenu(bot, msg, languageCode.ChooseIntensity, intensityKeyboard(reported));
        else await showMenu(bot, msg, languageCode.ChooseSolarMode, solarKeyboard(reported));
        return true;
      }
      return true;
    case "int":
      if (!INTENSITIES.includes(value)) return answer().then(() => true);
      await answer();
      await done(bot, msg, await api.setIntensity(token, deviceId, value), fill(languageCode.IntensitySet, value));
      return true;
    case "fv":
      if (!FV_MODES.includes(value)) return answer().then(() => true);
      await answer();
      await done(bot, msg, await api.setFvMode(token, deviceId, value), fill(languageCode.SolarModeSet, fvModeName(value)));
      return true;
    case "dyn":
      if (value !== 0 && value !== 1) return answer().then(() => true);
      await answer();
      await done(bot, msg, await api.setDynamic(token, deviceId, value === 1), value === 1 ? languageCode.DynamicEnabled : languageCode.DynamicDisabled);
      return true;
    default:
      return false;
  }
}

module.exports = { handleControls, setKeyboard, intensityKeyboard, solarKeyboard };
