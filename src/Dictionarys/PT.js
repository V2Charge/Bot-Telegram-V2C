module.exports = {

    //COMMANDS MENU
    "CmdToken": "Introduza o seu token V2C Cloud",
    "CmdList": "Liste os seus carregadores",
    "CmdDevice": "Escolha o carregador a utilizar",
    "CmdSet": "Controle o carregador",
    "CmdInfo": "Estado e informações do carregador",
    "CmdHelp": "Ajuda",
    "TokenHelpUrl": "https://v2charge.com/how-can-i-get-my-token-id-to-use-the-api-rest-cloud/",


    //TOKEN VALUES
    "TokenHelp": "Para obter a chave token, deverá aceder à secção “API Key” através da web V2C Cloud - com a sua conta. \n\n Depois deverá selecionar a opção “Gerar Token” e aparecerá a referência alfanumérica. Esse ID será a sua key de referência e de utilização. \n\n",
    "TokenOK": "Key inserido com êxito!\n\n Selecione o e-Charger que pretenda configurar. Para que isso seja possível deverá colocar o comando /device seguido de espaço e device Id do e-Charger pretenda ativar.\n\n Por exemplo \n/device ABCDEFG",
    "TokenKO": "¡O key token não é válido.\n  Se não sabe como obter o token escreva /token.\n No caso de ter o token consigo, por favor volte a introduzi-lo depois do comando /token",
    "PairedList": "Lista de dispostiivo emparelhados",

    //DEVICEID
    "AddDeviceHelp": "Deverá indicar o dispositivo que pretende adicionar com o seguinte formato /device <<deviceId>>\n\n Para conhecer a lista de dispositivos emparelhados utilize o comando /list",
    "AddDeviceOK": "O dispositivo foi corretamente vinculado: ",
    "DeviceActions": "Para ver o estado do carregador utilize o comando /info.\n\n Para modificar o estado ou os detalhes do carregador utilize o comando /set",
    "AddDeviceKO": "Não foi possível vincular o seguinte dispositivo: ",
    //HELP
    "Help": "\n Olá, benvindo ao V2C Bot 👋👋 \n\n\n Para iniciar necessitamos que nos indique o token de identificação /token e o deviceID do carregador /device.\n\n Uma vez disponibilizado e colocado o token serão expostos em formato lista os carregadores disponíveis. \n\n Para obter a lista novamente deverá utilizar o comando /list.\n\n Se não conseguir obter o token, deverá executar o comando /token sem nada adicionado e será disponibilizado uma guia.\n\n Quando selecione o carregador poderá realizar os seguintes comandos: /set e /info.\n\n/set \t- Permite controlar o e-Charger:Pausa, Retomar, Bloquear, Desbloquear\n\n/info \t- Para obter mais informação do e-Charger, bem como os seus dados estatisticos \n\n/help \t- Ajuda a\n\n\n",

    //INFO
    "ChooseInfo": "Selecione uma opção ",
    "StatusInfo": "🚙 Estado Atual",
    "StadisticsInfo": "📊 Estatísticas",
    "InstensityInfo": "⚡Valor de intensidade⚡",
    "CurrentHousePower": "🏠⚡ Consumo Atual",
    "ScheduleInfo": "⏰ Valores de Programação",
    "ChargingInformation" : "🔋Informação da carga🔋",

    //SET
    "PauseMode": "Pausar",
    "ResumeMode": "Retomar",
    "LockMode": "Desabilitar",
    "UnLockMode": "Desabilitar",

    //ERROR
    "ErrorOperation": "A operação anterior não foi possível completar. É importante confirmar que o e-Charger está conectado à rede corretamente e que a operação seja a correta",

    //STATUS
    "Disconnected": "🚫 O e-Charger está desconectado da internet 🚫",
    "Paused": "⏸️ e-Charger em pausa ⏸️",
    "Charging": "🔋🚘 O carregador está conectado ao seu veículo e o seu veículo encontra-se a carregar 🔋🚘",
    "Waiting": "🚘 O e-Charger está conectado ao seu veículo e está em modo stand by 🚘",
    "Locked": "🔒 e-Charger Desabilitado 🔒",
    "StandBy": "🚙 Esperando veículo elétrico🚙",
    "Programed": "⏰ e-Charger Programado ⏰",

    //STADISTICS
    "Start": "▶️",
    "TimingCharging": "🏁",
    "Energy": "🔋🚘",
    "Cost": "💰",
    "CoCost": "🌿🌏",

    //SCHEDULE
    "day1": "Segunda-feira,\t",
    "day2": "Terça-feira,\t",
    "day3": "Terça-feira,\t",
    "day4": "Quinta-feira,\t",
    "day5": "Sexta-feira,\t",
    "day6": "Sábado,\t",
    "day7": "Domingo\t",
    "days": "\nDias :\t",

    "FirstNoProgramed": "O primeiro temporizador está desabilitado ❌ ",
    "SecondNoProgramed": "O segundo temporizador está desabilitado ❌ ",
    "Timer1": "Temporizador 1\n",
    "Timer2": "Temporizador 2\n",
    "allweek": "De segunda-feira a domingo",
    "schedule": "O seu programa inicia às",
    "scheduleOne": " e termina às ",
    "scheduleTWo": "VER PROGRAMA",

};
