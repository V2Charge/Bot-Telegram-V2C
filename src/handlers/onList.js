const api = require('../api');
const onToken = require("./onToken");
const logger = require("../logger");

const PAGE_SIZE = 8;
// Cada página nueva pediría otra vez los cargadores a la API (que tiene un
// límite diario de llamadas); se guardan unos minutos por chat.
const CACHE_TTL = 5 * 60 * 1000;
const cache = new Map();

async function getPairingsCached(chatId, token) {
  const cached = cache.get(chatId);
  if (cached && Date.now() - cached.at < CACHE_TTL) {
    return cached.pairings;
  }
  const pairings = await api.getPairings(token);
  if (pairings) {
    pairings.sort((a, b) => String(a.tag || a.deviceId).localeCompare(String(b.tag || b.deviceId)));
    cache.set(chatId, { pairings, at: Date.now() });
  }
  return pairings;
}

function deviceLabel(pairing) {
  return pairing.tag ? `${pairing.tag} (${pairing.deviceId})` : pairing.deviceId;
}

// Teclado con una página de cargadores y, si hace falta, botones de paginación
function devicesKeyboard(pairings, page) {
  const pages = Math.max(1, Math.ceil(pairings.length / PAGE_SIZE));
  page = Math.min(Math.max(0, page), pages - 1);
  const rows = pairings
    .slice(page * PAGE_SIZE, (page + 1) * PAGE_SIZE)
    .map((p) => [{ text: "🔌 " + deviceLabel(p), callback_data: "dev:" + p.deviceId }]);
  if (pages > 1) {
    const nav = [];
    if (page > 0) nav.push({ text: "⬅️", callback_data: "devpage:" + (page - 1) });
    nav.push({ text: `${page + 1}/${pages}`, callback_data: "noop" });
    if (page < pages - 1) nav.push({ text: "➡️", callback_data: "devpage:" + (page + 1) });
    rows.push(nav);
  }
  return { inline_keyboard: rows };
}

async function onListHandler(bot, msg) {
  try {
    var token = await api.getToken(msg.chat.id);
    if (!token) {
      onToken.onTokenHandler(bot, msg, [""]);
      return;
    }
    cache.delete(msg.chat.id);
    const pairings = await getPairingsCached(msg.chat.id, token);
    if (pairings == null) {
      bot.sendMessage(msg.chat.id, languageCode.ErrorOperation);
      return;
    }
    if (pairings.length === 0) {
      bot.sendMessage(msg.chat.id, languageCode.NoDevices);
      return;
    }
    bot.sendMessage(msg.chat.id, languageCode.ChooseDevice, { reply_markup: devicesKeyboard(pairings, 0) });
  } catch (error) {
    logger.error("list", error);
  }
}

// Botones ⬅️ / ➡️: cambia de página editando el mismo mensaje
async function onDevicePage(bot, msg, token, page) {
  const pairings = await getPairingsCached(msg.chat.id, token);
  if (!pairings) {
    bot.sendMessage(msg.chat.id, languageCode.ErrorOperation);
    return;
  }
  await bot.editMessageReplyMarkup(devicesKeyboard(pairings, page), {
    chat_id: msg.chat.id,
    message_id: msg.message_id,
  }).catch(() => {});
}

module.exports = onListHandler
module.exports.onDevicePage = onDevicePage
module.exports.getPairingsCached = getPairingsCached
module.exports.devicesKeyboard = devicesKeyboard
module.exports.deviceLabel = deviceLabel
