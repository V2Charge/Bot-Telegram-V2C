const api = require("../api");


function responseTokenHelp(bot, msg) {
  bot.sendMessage(msg.chat.id, languageCode.TokenHelp + languageCode.TokenHelpUrl);
}

async function checkToken(msg, token) {
  return await api.addToken(msg.chat.id, token);
}

function responseTokenNotValid(bot, msg) {
  bot.sendMessage(msg.chat.id, languageCode.TokenKO);
}


async function onTokenHandler(bot, msg, match) {
  return new Promise(async (resolve) => {
    const token = match[1] && match[1].trim();

    if (!token) {
      responseTokenHelp(bot, msg);
      resolve(false);
      return;
    }
    // El token no debe quedarse en el historial del chat
    const deleted = await bot.deleteMessage(msg.chat.id, msg.message_id).catch(() => false);
    if (deleted) {
      await bot.sendMessage(msg.chat.id, languageCode.TokenMessageDeleted);
    }
    var resultToken = await checkToken(msg, token)
    if (!resultToken) {
      responseTokenNotValid(bot, msg);
      responseTokenHelp(bot, msg);
      resolve(false);
      return;
    }
    bot.sendMessage(msg.chat.id, languageCode.TokenOK);
    resolve(true);
  }
  );
}

module.exports = { onTokenHandler, responseTokenHelp }