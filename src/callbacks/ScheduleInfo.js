const api = require("../api");


async function ScheduleInfoCallback(bot, callbackqueryId, msg, token, deviceId) {

    var scheduleInfo = await api.reported(token, deviceId);

    if (scheduleInfo) {
        onSuccess(bot, callbackqueryId, msg, scheduleInfo);
    } else {
        onError(bot, callbackqueryId, msg);
    }
}

function sendNoProgramMessage(bot, callbackqueryId, msg) {
    bot.answerCallbackQuery(callbackqueryId).then(() => {
        bot.sendMessage(msg.chat.id, languageCode.FirstNoProgramed +"\n" + languageCode.SecondNoProgramed)
    });
}

function onError(bot, callbackqueryId, msg) {
    bot.answerCallbackQuery(callbackqueryId).then(() => bot.sendMessage(msg.chat.id, languageCode.ErrorOperation));
}

function onSuccess(bot, callbackqueryId, msg, scheduleInfo) {
    if (scheduleInfo.programed == 0) {
        sendNoProgramMessage(bot, callbackqueryId, msg)
        return
    }
    bot.answerCallbackQuery(callbackqueryId).then(() => {

        var min_start_1 = scheduleInfo.minutestart_00;
        var hour_start_1 = scheduleInfo.hourstart_00;
        var minuteend_1 = scheduleInfo.minuteend_00;
        var hour_end_1 = scheduleInfo.hourend_00;

        var min_start_2 = scheduleInfo.minutestart_01;
        var hour_start_2 = scheduleInfo.hourstart_01;
        var minuteend_2 = scheduleInfo.minuteend_01;
        var hour_end_2 = scheduleInfo.hourend_01;
        
        var daysofweek_2 = String(scheduleInfo.daysofweek_01);
        var daysofweek_1 = String(scheduleInfo.daysofweek_00);
        var daysOne = "";
        var daysTwo = "";

        min_start_1 = String(min_start_1).padStart(2, "0"); 
        hour_start_1 = String(hour_start_1).padStart(2, "0");
        minuteend_1 = String(minuteend_1).padStart(2, "0");
        hour_end_1 = String(hour_end_1).padStart(2, "0");
        
        min_start_2 = String(min_start_2).padStart(2, "0");
        hour_start_2 = String(hour_start_2).padStart(2, "0"); 
        minuteend_2 = String(minuteend_2).padStart(2, "0"); 
        hour_end_2 = String(hour_end_2).padStart(2, "0");
       
        //Temporizador 1:
        if (daysofweek_1 != "8") {
            for (var i = 0; i < daysofweek_1.length; i++) {
                if (daysofweek_1[i].includes('1')) { daysOne = daysOne + languageCode.day1; }
                if (daysofweek_1[i].includes('2')) { daysOne = daysOne + languageCode.day2; }
                if (daysofweek_1[i].includes('3')) { daysOne = daysOne + languageCode.day3; }
                if (daysofweek_1[i].includes('4')) { daysOne = daysOne + languageCode.day4; }
                if (daysofweek_1[i].includes('5')) { daysOne = daysOne + languageCode.day5; }
                if (daysofweek_1[i].includes('6')) { daysOne = daysOne + languageCode.day6; }
                if (daysofweek_1[i].includes('7')) { daysOne = daysOne + languageCode.day7; }
            }
            bot.sendMessage(msg.chat.id, languageCode.Timer1 + languageCode.days + daysOne + "\n" + languageCode.schedule + hour_start_1 + ":" + min_start_1 + languageCode.scheduleOne + hour_end_1 + ":" + minuteend_1 + "\t\t");
        }else {
            //Temporizador1 No programado
            bot.sendMessage(msg.chat.id,languageCode.FirstNoProgramed);
        }

        //Temporizador2:
        if (daysofweek_2 != "8") {
            for (var i = 0; i < daysofweek_2.length; i++) {
                if (daysofweek_2[i].includes('1')) { daysTwo = daysTwo + languageCode.day1; }
                if (daysofweek_2[i].includes('2')) { daysTwo = daysTwo + languageCode.day2; }
                if (daysofweek_2[i].includes('3')) { daysTwo = daysTwo + languageCode.day3; }
                if (daysofweek_2[i].includes('4')) { daysTwo = daysTwo + languageCode.day4; }
                if (daysofweek_2[i].includes('5')) { daysTwo = daysTwo + languageCode.day5; }
                if (daysofweek_2[i].includes('6')) { daysTwo = daysTwo + languageCode.day6; }
                if (daysofweek_2[i].includes('7')) { daysTwo = daysTwo + languageCode.day7; }
            }
            bot.sendMessage(msg.chat.id, languageCode.Timer2 + languageCode.days + daysTwo + "\n" + languageCode.schedule + hour_start_2 + ":" + min_start_2 + languageCode.scheduleOne + " " + hour_end_2 + ":" + minuteend_2 + "\t\t");
        }
        else {
            //Temporizador1 No programado
            bot.sendMessage(msg.chat.id, languageCode.SecondNoProgramed);
        }
    })



}

module.exports = ScheduleInfoCallback;