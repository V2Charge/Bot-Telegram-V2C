const api = require('../api');
const onToken = require("./onToken");
const logger = require("../logger");


async function onListHandler(bot, msg) {
  try {
    var token = await api.getToken(msg.chat.id);
    if (!token) {
      onToken.onTokenHandler(bot, msg, [""]);
      return;
    }
    bot.sendMessage(msg.chat.id, languageCode.PairedList);
    const pairings = await api.getPairings(token)
    if (pairings != null) {
      for (var i in pairings) {
        bot.sendMessage(msg.chat.id, 'DeviceID: ' + pairings[i].deviceId + "\nTAG: " + pairings[i].tag);
      }
    }
  } catch (error) {
    logger.error("list", error);
  }
}

module.exports = onListHandler