const api = require("../api");


function responseTokenHelp(bot, msg) {
  bot.sendMessage(msg.chat.id, languageCode.TokenHelp + "https://v2charge.com/es/como-obtener-mi-identificador-token-para-usar-la-api-rest-cloud/");
}

async function checkToken(msg, token) {
  return await api.addToken(msg.chat.id, token);
}

function responseTokenNotValid(bot, msg) {
  bot.sendMessage(msg.chat.id, languageCode.TokenKO);
}


async function onTokenHandler(bot, msg, match) {
  return new Promise(async (resolve) => {
    const token = match[1];

    if (!token) {
      responseTokenHelp(bot, msg);
      resolve(false);
      return;
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