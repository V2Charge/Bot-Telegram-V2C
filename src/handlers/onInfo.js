const api = require('../api');
const responseDeviceHelp = require('./onDevice');
const onToken = require('./onToken');


function onUserInfoError(bot, msg) {
  responseDeviceHelp(bot, msg);
}


async function onInfoHandler(bot, msg) {
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
            text: languageCode.StatusInfo,
            callback_data: "StatusInfo",
          },
          {
            text: languageCode.CurrentHousePower,
            callback_data: "CurrentHousePower",
          },
        ],
        [
          {
            text: languageCode.ScheduleInfo,
            callback_data: "ScheduleInfo",
          },
          {
            text: languageCode.StadisticsInfo,
            callback_data: "StadisticsInfo",
          },
        ],
        [
          {
            text: languageCode.InstensityInfo,
            callback_data: "InstensityInfo",
          },
        ]
      ],
    },
  });
}

module.exports = onInfoHandler
