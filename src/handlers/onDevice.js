
const api = require("../api");
const onToken = require("./onToken");
const onListHandler = require("./onList");


function responseDeviceHelp(bot, msg) {
  bot.sendMessage(msg.chat.id, languageCode.AddDeviceHelp);
}

function onErrorDeviceAdd(bot, chatId, deviceId) {
  bot.sendMessage(chatId, languageCode.AddDeviceKO + deviceId);
}

async function onSuccessDeviceAdd(bot, chatId, label) {
  await bot.sendMessage(chatId, languageCode.AddDeviceOK + label);
  bot.sendMessage(chatId, languageCode.DeviceActions);
}

// Guarda el cargador elegido, comprobando antes que pertenece al usuario.
// Se usa desde /device <id> y desde los botones de /list.
async function selectDevice(bot, chatId, token, deviceId) {
  const pairings = await onListHandler.getPairingsCached(chatId, token);
  const devicePaired = pairings && pairings.find((p) => p.deviceId == deviceId);
  if (!devicePaired) {
    onErrorDeviceAdd(bot, chatId, deviceId);
    return false;
  }
  if (!(await api.updateUserData(chatId, token, devicePaired.deviceId, devicePaired.tag))) {
    onErrorDeviceAdd(bot, chatId, deviceId);
    return false;
  }
  await onSuccessDeviceAdd(bot, chatId, onListHandler.deviceLabel(devicePaired));
  return true;
}


async function onDeviceHandler(bot, msg, match) {

  const deviceId = match[1] && match[1].trim();

  // Sin ID se muestra la lista de cargadores para elegir con un botón
  if (!deviceId) {
    return onListHandler(bot, msg);
  }
  var token = await api.getToken(msg.chat.id);
  if (!token) {
    onToken.onTokenHandler(bot, msg, [""]);
    return;
  }
  return selectDevice(bot, msg.chat.id, token, deviceId);
}

module.exports = { onDeviceHandler, responseDeviceHelp, selectDevice }
