const onToken = require("./handlers/onToken");
const onHelpHandler = require("./handlers/onHelp");
const onInfoHandler = require("./handlers/onInfo");
const onSetHandler = require("./handlers/onSet");
const onListHandler = require("./handlers/onList");
const onDevice = require("./handlers/onDevice");
const onCallBackQueryHandler = require("./callbacks/callbackQueryHandler");
const TelegramBot = require('node-telegram-bot-api');
const getLanguage = require('./Dictionarys/Dictionary')
const EN = require('./Dictionarys/EN');
global.languageCode = EN;

class V2CTelegramBot {


    constructor(telegramToken) {
        this.bot = new TelegramBot(telegramToken, { polling: true });
        this.setMenuCommands();
    }

    async onTokenHandler(msg, match) {
        languageCode = getLanguage(msg)
        var result = await onToken.onTokenHandler(this.bot, msg, match)
        if (result) {
            this.onListHandler(msg)
        }
    }

    async onDeviceHandler(msg, match) {
        languageCode = getLanguage(msg)
        return await onDevice.onDeviceHandler(this.bot, msg, match)
    }

    async onListHandler(msg) {
        languageCode = getLanguage(msg)
        return await onListHandler(this.bot, msg)
    }

    async onHelpHandler(msg) {
        languageCode = getLanguage(msg)
        return await onHelpHandler(this.bot, msg)
    }

    async onInfoHandler(msg) {
        languageCode = getLanguage(msg)
        return await onInfoHandler(this.bot, msg)
    }

    async onSetHandler(msg) {
        languageCode = getLanguage(msg)
        return await onSetHandler(this.bot, msg)
    }

    async onCallBackQueryHandler(callbackQuery) {
        languageCode = getLanguage(callbackQuery)
        return onCallBackQueryHandler(this.bot, callbackQuery)
    }

    setMenuCommands() {
        this.bot.setMyCommands([
            { command: "/token", description: "Introduce el token" },
            { command: "/list", description: "Listame dispositivos" },
            { command: "/device", description: "Asigna un dispositivo para realizar operaciones" },
            { command: "/set", description: "Para modificar el estado o parametros" },
            { command: "/info", description: "Para obtener información" },
            { command: "/help", description: "Obtiene Ayuda" }]);
    }

    async init() {
        this.setMenuCommands();
        this.bot.onText(/\/token ?(.+)?/, async (msg, match) => { this.onTokenHandler(msg, match) });
        this.bot.onText(/\/list/, async (msg) => { this.onListHandler(msg) });
        this.bot.onText(/\/help/, async (msg) => { this.onHelpHandler(msg) });
        this.bot.onText(/\/start/, async (msg) => { this.onHelpHandler(msg) });
        this.bot.onText(/\/device ?(.+)?/, async (msg, match) => { this.onDeviceHandler(msg, match) });
        this.bot.onText(/\/info/, async (msg) => { this.onInfoHandler(msg) });
        this.bot.onText(/\/set/, async (msg) => { this.onSetHandler(msg) });
        this.bot.on('callback_query', (callbackQuery) => { this.onCallBackQueryHandler(callbackQuery) });
    }
}

module.exports = V2CTelegramBot