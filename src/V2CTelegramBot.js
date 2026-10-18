const onToken = require("./handlers/onToken");
const onHelpHandler = require("./handlers/onHelp");
const onInfoHandler = require("./handlers/onInfo");
const onSetHandler = require("./handlers/onSet");
const onListHandler = require("./handlers/onList");
const onDevice = require("./handlers/onDevice");
const onCallBackQueryHandler = require("./callbacks/callbackQueryHandler");
const TelegramBot = require('node-telegram-bot-api');
const { runWithLanguage, LANGUAGES } = require('./Dictionarys/Dictionary')
const EN = require('./Dictionarys/EN');

class V2CTelegramBot {


    constructor(telegramToken) {
        this.bot = new TelegramBot(telegramToken, { polling: true });
    }

    async onTokenHandler(msg, match) {
        var result = await onToken.onTokenHandler(this.bot, msg, match)
        if (result) {
            this.onListHandler(msg)
        }
    }

    async onDeviceHandler(msg, match) {
        return await onDevice.onDeviceHandler(this.bot, msg, match)
    }

    async onListHandler(msg) {
        return await onListHandler(this.bot, msg)
    }

    async onHelpHandler(msg) {
        return await onHelpHandler(this.bot, msg)
    }

    async onInfoHandler(msg) {
        return await onInfoHandler(this.bot, msg)
    }

    async onSetHandler(msg) {
        return await onSetHandler(this.bot, msg)
    }

    async onCallBackQueryHandler(callbackQuery) {
        return onCallBackQueryHandler(this.bot, callbackQuery)
    }

    static menuCommands(dictionary) {
        return [
            { command: "token", description: dictionary.CmdToken },
            { command: "list", description: dictionary.CmdList },
            { command: "device", description: dictionary.CmdDevice },
            { command: "set", description: dictionary.CmdSet },
            { command: "info", description: dictionary.CmdInfo },
            { command: "help", description: dictionary.CmdHelp }];
    }

    async setMenuCommands() {
        try {
            // Menú por defecto en inglés y uno traducido para cada idioma soportado
            await this.bot.setMyCommands(V2CTelegramBot.menuCommands(EN));
            for (const [code, dictionary] of Object.entries(LANGUAGES)) {
                await this.bot.setMyCommands(V2CTelegramBot.menuCommands(dictionary), { language_code: code });
            }
        } catch (error) {
            console.error('setMyCommands', error.message);
        }
    }

    // Registra un comando para que se procese en el idioma de quien lo envía
    command(regex, handler) {
        this.bot.onText(regex, (msg, match) => runWithLanguage(msg, () => handler(msg, match)));
    }

    async init() {
        this.setMenuCommands();
        this.command(/^\/token(?:@\w+)?(?:\s+(.+))?$/i, (msg, match) => this.onTokenHandler(msg, match));
        this.command(/^\/list(?:@\w+)?\s*$/i, (msg) => this.onListHandler(msg));
        this.command(/^\/help(?:@\w+)?\s*$/i, (msg) => this.onHelpHandler(msg));
        this.command(/^\/start(?:@\w+)?(?:\s+.*)?$/i, (msg) => this.onHelpHandler(msg));
        this.command(/^\/device(?:@\w+)?(?:\s+(.+))?$/i, (msg, match) => this.onDeviceHandler(msg, match));
        this.command(/^\/info(?:@\w+)?\s*$/i, (msg) => this.onInfoHandler(msg));
        this.command(/^\/set(?:@\w+)?\s*$/i, (msg) => this.onSetHandler(msg));
        this.bot.on('callback_query', (callbackQuery) => runWithLanguage(callbackQuery, () => this.onCallBackQueryHandler(callbackQuery)));
        this.bot.on('polling_error', (error) => { console.error('polling_error', error.code, error.message) });
    }
}

module.exports = V2CTelegramBot