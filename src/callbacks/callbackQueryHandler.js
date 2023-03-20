const lockCallback = require("./lock");
const unlockCallback = require("./unlock");
const pauseCallback = require("./pause");
const resumeCallback = require("./resume");
const statusCallback = require("./status")
const intensityCallback = require("./intensity")
const houseIntensityCallback = require("./houseIntensity")
const stadisticsCallback = require("./stadistics")
const onToken = require('../handlers/onToken');
const api = require("../api");
const ScheduleInfoCallback = require("./ScheduleInfo");


function onError(bot, msg) {
    bot.sendMessage(msg.chat.id, languageCode.ErrorOperation);
}

function onUserInfoError(bot, msg) {
    bot.sendMessage(msg.chat.id, languageCode.AddDeviceHelp);
}

async function onCallBackQueryHandler(bot, callbackQuery) {
    var category = callbackQuery.data;
    const msg = callbackQuery.message;
    const callbackqueryId = callbackQuery.id
    try {
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
        switch (category) {
            case "LockMode":
                console.log("LockMode");
                await lockCallback(bot, callbackqueryId, msg, token, userInfo.deviceId)
                break;
            case "UnLockMode":
                console.log("UnLockMode");
                await unlockCallback(bot, callbackqueryId, msg, token, userInfo.deviceId)
                break;
            case "ResumeMode":
                console.log("ResumeMode");
                await resumeCallback(bot, callbackqueryId, msg, token, userInfo.deviceId)
                break;
            case "PauseMode":
                console.log("PauseMode");
                await pauseCallback(bot, callbackqueryId, msg, token, userInfo.deviceId)
                break;
            case "StatusInfo":
                console.log("StatusInfo");
                await statusCallback(bot, callbackqueryId, msg, token, userInfo.deviceId)
                break;
            case "InstensityInfo":
                console.log("InstensityInfo");
                await intensityCallback(bot, callbackqueryId, msg, token, userInfo.deviceId)
                break;
            case "CurrentHousePower":
                console.log("CurrentHousePower");
                await houseIntensityCallback(bot, callbackqueryId, msg, token, userInfo.deviceId)
                break;
            case "ScheduleInfo":
                console.log("ScheduleInfo");
                await ScheduleInfoCallback(bot, callbackqueryId, msg, token, userInfo.deviceId)
                break;
            case "StadisticsInfo":
                console.log("StadisticsInfo");
                await stadisticsCallback(bot, callbackqueryId, msg, token, userInfo.deviceId)
                break;
        }
    } catch (err) {
        console.log(err)
        onError(bot, msg)
    }
}

module.exports = onCallBackQueryHandler