const lockCallback = require("./lock");
const unlockCallback = require("./unlock");
const pauseCallback = require("./pause");
const resumeCallback = require("./resume");
const statusCallback = require("./status")
const intensityCallback = require("./intensity")
const houseIntensityCallback = require("./houseIntensity")
const stadisticsCallback = require("./stadistics")
const onToken = require('../handlers/onToken');
const { onDevicePage } = require('../handlers/onList');
const { selectDevice } = require('../handlers/onDevice');
const api = require("../api");
const logger = require("../logger");
const ScheduleInfoCallback = require("./ScheduleInfo");
const { handleControls } = require("./controls");


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
        if (category === "noop") {
            bot.answerCallbackQuery(callbackqueryId).catch(() => {});
            return;
        }
        var token = await api.getToken(msg.chat.id);
        if (!token) {
            bot.answerCallbackQuery(callbackqueryId).catch(() => {});
            onToken.onTokenHandler(bot, msg, [""]);
            return;
        }
        // Botones de la lista de cargadores: no necesitan un cargador elegido
        if (category.startsWith("devpage:")) {
            bot.answerCallbackQuery(callbackqueryId).catch(() => {});
            await onDevicePage(bot, msg, token, Number(category.slice("devpage:".length)) || 0);
            return;
        }
        if (category.startsWith("dev:")) {
            bot.answerCallbackQuery(callbackqueryId).catch(() => {});
            await selectDevice(bot, msg.chat.id, token, category.slice("dev:".length));
            return;
        }
        var userInfo = await api.getUserInfo(msg.chat.id, token)
        if (!userInfo || !userInfo.deviceId) {
            bot.answerCallbackQuery(callbackqueryId).catch(() => {});
            onUserInfoError(bot, msg);
            return;
        }
        logger.debug("callback", category);
        if (await handleControls(bot, callbackqueryId, msg, token, userInfo.deviceId, category)) {
            return;
        }
        switch (category) {
            case "LockMode":
                await lockCallback(bot, callbackqueryId, msg, token, userInfo.deviceId)
                break;
            case "UnLockMode":
                await unlockCallback(bot, callbackqueryId, msg, token, userInfo.deviceId)
                break;
            case "ResumeMode":
                await resumeCallback(bot, callbackqueryId, msg, token, userInfo.deviceId)
                break;
            case "PauseMode":
                await pauseCallback(bot, callbackqueryId, msg, token, userInfo.deviceId)
                break;
            case "StatusInfo":
                await statusCallback(bot, callbackqueryId, msg, token, userInfo.deviceId)
                break;
            case "StatusRefresh":
                await statusCallback(bot, callbackqueryId, msg, token, userInfo.deviceId, true)
                break;
            case "InstensityInfo":
                await intensityCallback(bot, callbackqueryId, msg, token, userInfo.deviceId)
                break;
            case "CurrentHousePower":
                await houseIntensityCallback(bot, callbackqueryId, msg, token, userInfo.deviceId)
                break;
            case "ScheduleInfo":
                await ScheduleInfoCallback(bot, callbackqueryId, msg, token, userInfo.deviceId)
                break;
            case "StadisticsInfo":
                await stadisticsCallback(bot, callbackqueryId, msg, token, userInfo.deviceId)
                break;
        }
    } catch (err) {
        logger.error("callback", category, err)
        bot.answerCallbackQuery(callbackqueryId).catch(() => {});
        onError(bot, msg)
    }
}

module.exports = onCallBackQueryHandler