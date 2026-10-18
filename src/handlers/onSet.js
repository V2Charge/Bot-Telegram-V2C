const api = require('../api');
const { responseDeviceHelp } = require('./onDevice');
const onToken = require('./onToken');
const { setKeyboard } = require('../callbacks/controls');


function onUserInfoError(bot, msg) {
  responseDeviceHelp(bot, msg);
}


async function onSetHandler(bot, msg) {
  var token = await api.getToken(msg.chat.id);
  if (!token) {
    onToken.onTokenHandler(bot, msg, [""]);
    return;
  }
  var userInfo = await api.getUserInfo(msg.chat.id, token)
  if (!userInfo || !userInfo.deviceId) {
    onUserInfoError(bot, msg);
    return;
  }
  bot.sendMessage(msg.chat.id, languageCode.ChooseInfo, { reply_markup: setKeyboard() });
}

module.exports = onSetHandler
