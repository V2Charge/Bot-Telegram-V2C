const api = require('../api');
const responseDeviceHelp = require('./onDevice');
const onToken = require('./onToken');


function onUserInfoError(bot, msg) {
  responseDeviceHelp(bot, msg);
}


async function onSetHandler(bot, msg) {
  var token = await api.getToken(msg.chat.id);
  if (token.length == 0) {
    onToken.onTokenHandler(bot, msg, [""]);
    return;
  }
  var userInfo = await api.getUserInfo(msg.chat.id, token)
  if (userInfo == null || userInfo.deviceId == "") {
    onUserInfoError(bot, msg);
    return;
  }
  bot.sendMessage(msg.chat.id, languageCode.ChooseInfo, {

    "reply_markup": {
      "inline_keyboard": [
        [
          {
            text: languageCode.PauseMode,
            callback_data: "PauseMode",
          },
          {
            text: languageCode.ResumeMode,
            callback_data: "ResumeMode",
          },
        ],
        [
          {
            text: languageCode.LockMode,
            callback_data: "LockMode",
          },
          {
            text: languageCode.UnLockMode,
            callback_data: "UnLockMode",
          },
        ]
      ],
    },
  });
}

module.exports = onSetHandler
