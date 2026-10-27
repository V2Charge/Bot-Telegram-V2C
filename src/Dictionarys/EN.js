module.exports = {

    //COMMANDS MENU
    "CmdToken": "Enter your V2C Cloud token",
    "CmdList": "List your chargers",
    "CmdDevice": "Choose the charger to work with",
    "CmdSet": "Control the charger",
    "CmdInfo": "Charger status and information",
    "CmdHelp": "Help",
    "TokenHelpUrl": "https://v2charge.com/how-can-i-get-my-token-id-to-use-the-api-rest-cloud/",
    "TokenMessageDeleted": "🔒 I've deleted your message with the token so it isn't kept in the chat.",


    //TOKEN VALUES
    "TokenHelp": "To obtain your token key, go to the section “Clave API” of the V2C Cloud web portal from your account.  \n\nA then click on the option “Generar Token” and, an alphanumeric reference will be displayed, that ID will be your token key. \n\n ",
    "TokenOK": "✅ Token saved successfully.",
    "TokenKO": "The token key is not valid.\nIf you don't know how to get it, write /token.\nIf you have it, enter it after the /token command ",
    "PairedList": "List of your paired devices",
    "ChooseDevice": "🔌 Choose the charger you want to use:",
    "NoDevices": "You don't have any chargers linked to your V2C Cloud account.",

    //DEVICEID
    "AddDeviceHelp": "First choose a charger with /list (or type /device followed by its ID, e.g. /device ABC123).",
    "AddDeviceOK": "The following device has been linked successfully: ",
    "DeviceActions": "To view the loader status use the /info command.\n\nTo modify the loader status or parameters use the /set command ",
    "AddDeviceKO": "The following device could not be paired: ",
    //HELP
    "Help": "\n Hello! Welcome to V2C Bot 👋👋 \n\n\nTo work I need you to indicate the identification token /token and the deviceID of the charger /device.\n\nOnce you put the token we will get a list with the available charging points.\n\nTo obtain the list again use the /list command.\n\nIf you don't know how to get the token run the /token command without anything and you will get a guide.\n\nWhen you select the loader you can perform the /set and /info commands.\n\n /set \t- Allows you to control the charger: Pause, Resume, Lock, Unlock\n\n/info \t- To obtain charger information such as its statistical data and current information about your charging point\n\n/help \t- Show help\n\n\n ",

    //INFO
    "ChooseInfo": "Choose an option ",
    "StatusInfo": "🚙 Actual state ",
    "StadisticsInfo": "📊 statistics",
    "InstensityInfo": "⚡intensity value ⚡",
    "CurrentHousePower": "🏠⚡ Current Consumption ",
    "ScheduleInfo": "⏰ Programming Values ",
    "PowerLabel": "Power",
    "EnergyLabel": "Energy",
    "TimeLabel": "Time",
    "IntensityLabel": "Current",
    "HousePowerLabel": "House consumption",
    "SolarLabel": "Solar production",
    "UpdatedLabel": "Updated",
    "Refresh": "🔄 Refresh",
    "LastSessions": "📊 Latest charging sessions",
    "Total": "Total",
    "NoSessions": "There are no charging sessions yet.",
    "StatsOwnerOnly": "📊 Statistics are only available to the charger's owner. This device is shared with you as a guest.",
    "StateUnavailable": "ℹ️ This device doesn't report a charging state.",

    //SET
    "PauseMode": "pause",
    "ResumeMode": "Resume",
    "LockMode": "To disable ",
    "UnLockMode": "Enable",
    "IntensityMenu": "🎚️ Current",
    "ChooseIntensity": "Choose the maximum charging current:",
    "IntensitySet": "✅ Current set to {value} A",
    "SolarMenu": "☀️ Solar mode",
    "ChooseSolarMode": "Photovoltaic charging mode and dynamic power control:",
    "FvMode0": "PV + minimum power",
    "FvMode1": "PV surplus only",
    "FvMode2": "Maximum power",
    "SolarModeSet": "✅ Mode changed: {value}",
    "DynamicOn": "Dynamic: on",
    "DynamicOff": "Dynamic: off",
    "DynamicEnabled": "✅ Dynamic control enabled",
    "DynamicDisabled": "✅ Dynamic control disabled",
    "Back": "⬅️ Back",

    //ERROR
    "ErrorOperation": "The above operation could not be completed. Make sure that the charger is connected to the network correctly and that the operation is correct ",

    //STATUS
    "Disconnected": "🚫 The charger is disconnected from the internet 🚫",
    "Paused": "⏸️ charger paused ⏸️",
    "Charging": "🔋🚘 The charger is connected to your vehicle and is charging 🔋🚘",
    "Waiting": "🚘 The charger is connected to your vehicle and is charging 🚘",
    "Locked": "🔒 Charger Disabled 🔒",
    "StandBy": "🚙 Waiting for vehicle 🚙",
    "Programed": "⏰ Scheduled Charger ⏰",
    "ChargingInformation" : "🔋Charging Information🔋",

    //STADISTICS
    "Start": "▶️",
    "TimingCharging": "🏁",
    "Energy": "🔋🚘",
    "Cost": "💰",
    "CoCost": "🌿🌏",

    "day1": "Monday,\t",
    "day2": "Tuesday,\t",
    "day3": "Wednesday,\t",
    "day4": "Thursday,\t",
    "day5": "Friday,\t",
    "day6": "Saturday,\t",
    "day7": "Sunday\t",
    "days": "\nDays :\t",
    "allweek": "Monday to sunday",

    "Timer1": "Timer 1\n",
    "Timer2": "Timer 2\n",
    "FirstNoProgramed": "Your first timer is not programmed  ❌",
    "SecondNoProgramed": "Your second timer is not programmed ❌",

    "schedule": "Your hours start from\t",
    "scheduleOne": "\tand ends at\t",
    "scheduleTWo": "SEE PROGRAM",


};
