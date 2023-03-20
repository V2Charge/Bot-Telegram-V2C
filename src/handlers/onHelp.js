


async function onHelpHandler(bot, msg) {
    bot.sendMessage(msg.chat.id, languageCode.Help);
}

module.exports = onHelpHandler