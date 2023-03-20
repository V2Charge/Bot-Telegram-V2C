
const api = require("../api");
const onToken = require("./onToken");


function responseDeviceHelp(bot, msg) {
  bot.sendMessage(msg.chat.id, languageCode.AddDeviceHelp);
}

function onErrorDeviceAdd(bot, msg, deviceId) {
  bot.sendMessage(msg.chat.id, languageCode.AddDeviceKO + deviceId);
}

async function onSuccessDeviceAdd(bot, msg, deviceId) {
  await bot.sendMessage(msg.chat.id, languageCode.AddDeviceOK + deviceId);
  bot.sendMessage(msg.chat.id, languageCode.DeviceActions);
}



function isValidDevice(pairings, device) {
  for (var i in pairings) {
    if (pairings[i].deviceId == device) {
      return true;
    }
  }
  return false;
}

function getPairing(pairings, device) {
  for (var i in pairings) {
    if (pairings[i].deviceId == device) {
      return pairings[i];
    }
  }
  return null;
}


async function addDeviceInformation(msg, token, deviceId, tag) {
  return await api.updateUserData(msg.chat.id, token, deviceId, tag);
}


async function onDeviceHandler(bot, msg, match) {

  const deviceId = match[1];

  if (!deviceId) {
    responseDeviceHelp(bot, msg);
    return;
  }
  var token = await api.getToken(msg.chat.id);
  if (token.length == 0) {
    onToken.onTokenHandler(bot, msg, [""]);
    return;
  }
  pairings = await api.getPairings(token)
  if (pairings == null) {
    onErrorDeviceAdd(bot, msg, deviceId);
    return;
  }
  if (!isValidDevice(pairings, deviceId)) {
    onErrorDeviceAdd(bot, msg, deviceId);
    return;
  }
  var devicePaired = getPairing(pairings, deviceId)
  if (devicePaired != null) {
    if (!addDeviceInformation(msg, token, devicePaired.deviceId, devicePaired.tag)) {
      onErrorDeviceAdd(bot, msg, deviceId);
      return;
    }
  }
  onSuccessDeviceAdd(bot, msg, deviceId)
}

module.exports = { onDeviceHandler, responseDeviceHelp }