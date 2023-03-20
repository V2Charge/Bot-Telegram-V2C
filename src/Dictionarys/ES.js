module.exports = {

    //TOKEN VALUES
    "TokenHelp": "Para obtener tu clave token, accede a la sección “Clave API” del portal web V2C Cloud desde tu cuenta. \n\nA continuación, pulsa sobre la opción “Generar Token” y, se te desplegará una referencia alfanumérica, ese ID será tu clave token. \n\n",
    "TokenOK": "Token insertado con éxito !\n\nSelecciona el e-Charger que deseas configurar. Para ello, introduce después del comando /device seguido de un espacio, el deviceId del e-Charger que quieras.\n\nPor ejemplo \n/device ABCDEFG",
    "TokenKO": "¡La clave de token no es válida .\nSi no sabes cómo obtenerla escriba /token.\nEncaso de contar con ella introdúcela después del comando /token",
    "PairedList": "Lista de sus dispositivos emparejados",

    //DEVICEID
    "AddDeviceHelp": "Debe de indicar un dispositivo añadir con el siguiente formato /device <<deviceId>>\n\nPara conocer la lista de dispositivos emparejados use el comando /list",
    "AddDeviceOK": "Se ha vinculado correctamente el siguiente dispositivo: ",
    "DeviceActions": "Para ver el estado del cargador use el comando /info.\n\nPara modificar el estado o parametros del cargador use el comando /set",
    "AddDeviceKO": "No se ha podido vincular el siguiente dispositivo: ",
    //HELP
    "Help": "\n ¡Hola! Bienvenido a V2C Bot 👋👋 \n\n\nPara funcionar necesito que me indiques el token de identificación /token y el deviceID del cargador /device.\n\nUna vez pongas el token te sacaremos un listado con los puntos de recarga disponibles.\n\nPara obtener el listado nuevamente use el comando /list.\n\nSi no sabes obtener el token ejecuta el comando /token sin nada y obtendras una guia.\n\nCuando selecciones el cargador podras realizar los comandos /set y /info.\n\n/set \t- Te permite controlar el cargador:Pausar, Reanudar, Bloquear, Desbloquear\n\n/info \t- Para obtener información del cargador como sus datos estadísticos y información actual sobre tu punto de recarga\n\n/help \t- Muestar la ayuda\n\n\n",

    //INFO
    "ChooseInfo": "Elige una opción ",
    "StatusInfo": "🚙 Estado Actual",
    "StadisticsInfo": "📊 Estadísticas",
    "InstensityInfo": "⚡Valor de intensidad⚡",
    "CurrentHousePower": "🏠⚡ Consumo Actual",
    "ScheduleInfo": "⏰ Valores de Programación",
    "ChargingInformation" : "🔋Informacíon de carga🔋",

    //SET
    "PauseMode": "Pausar",
    "ResumeMode": "Reanudar",
    "LockMode": "Deshabilitar",
    "UnLockMode": "Habilitar",

    //ERROR
    "ErrorOperation": "La operacion anterior no se ha podido completar. Asegurate que el cargador este conectado a la red correctamente y que la operación sea correcta",

    //STATUS
    "Disconnected": "🚫 El cargador esta desconectado de internet 🚫",
    "Paused": "⏸️ Cargador Pausado ⏸️",
    "Charging": "🔋🚘 El cargador esta conectado a tu vehiculo y esta cargando 🔋🚘",
    "Waiting": "🚘 El cargador esta conectado a tu vehiculo y esta en modo stand by 🚘",
    "Locked": "🔒 Cargador Deshabilitado 🔒",
    "StandBy": "🚙 Esperando a vehiculo 🚙",
    "Programed": "⏰ Cargador Programado ⏰",

    //STADISTICS
    "Start": "▶️",
    "TimingCharging": "🏁",
    "Energy": "🔋🚘",
    "Cost": "💰",
    "CoCost": "🌿🌏",

    //SCHEDULE
    "day1": "Lunes,\t",
    "day2": "Martes,\t",
    "day3": "Miércoles,\t",
    "day4": "Jueves,\t",
    "day5": "Viernes,\t",
    "day6": "Sábado,\t",
    "day7": "Domingo\t",
    "days": "\nDías :\t",

    "FirstNoProgramed": "Tu primer temporizador está deshabilitado ❌ ",
    "SecondNoProgramed": "Tu segundo temporizador está deshabilitado ❌",
    "Timer1": "Temporizador 1\n",
    "Timer2": "Temporizador 2\n",
    "allweek": "De lunes a domingo",
    "schedule": "Su programa comienza a las ",
    "scheduleOne": " y termina a las ",
    "scheduleTWo": "VER PROGRAMA",

};
