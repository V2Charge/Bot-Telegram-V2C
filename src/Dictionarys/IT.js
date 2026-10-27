module.exports = {

    //COMMANDS MENU
    "CmdToken": "Inserisci il tuo token V2C Cloud",
    "CmdList": "Elenca i tuoi caricatori",
    "CmdDevice": "Scegli il caricatore da usare",
    "CmdSet": "Controlla il caricatore",
    "CmdInfo": "Stato e informazioni del caricatore",
    "CmdHelp": "Aiuto",
    "TokenHelpUrl": "https://v2charge.com/how-can-i-get-my-token-id-to-use-the-api-rest-cloud/",
    "TokenMessageDeleted": "🔒 Ho eliminato il tuo messaggio con il token perché non resti salvato nella chat.",


    //TOKEN VALUES
    "TokenHelp": "Per ottenere la chiave token, accedere alla sezione “Chiave API“ del portale web V2C Cloud dal proprio account.\n\nOuindi, fare clic sull'opzione “Generate Token“ (Genera token) e verrà visualizzato un riferimento alfanumerico, questo ID sarà la chiave del token. \n\n",
    "TokenOK": "✅ Token salvato correttamente.",
    "TokenKO": "La chiave token non è valida.\n Se non si sa come ottenerla, digitare /token.\nSe la si possiede, inserirla dopo il comando /token.",
    "PairedList": "Elenco dei dispositivi accoppiati",
    "ChooseDevice": "🔌 Scegli il caricatore che vuoi usare:",
    "NoDevices": "Non hai caricatori collegati al tuo account V2C Cloud.",

    //DEVICEID
    "AddDeviceHelp": "Prima scegli un caricatore con /list (oppure scrivi /device seguito dal suo ID, ad es. /device ABC123).",
    "AddDeviceOK": "Il seguente dispositivo è stato accoppiato con successo: ",
    "DeviceActions": "Per visualizzare lo stato del caricatore, utilizzare il comando /info. Per modificare lo stato o i parametri del caricatore, utilizzare il comando /set.",
    "AddDeviceKO": "Non è stato possibile collegare il seguente dispositivo: ",
    //HELP
    "Help": "\n Ciao! Benvenuto su V2C Bot 👋👋\n\n\n Per funzionare ho bisogno che tu mi fornisca il token di identificazione /token e il deviceID del caricatore /device. \n\nUna volta inserito il token, si otterrà un elenco dei punti di ricarica disponibili. \n\nPer ottenere nuovamente l'elenco, utilizzare il comando /list. \n\nSe non sapete come ottenere il token, eseguite il comando /token senza nulla e otterrete una guida. \n\nQuando si seleziona il caricatore, è possibile eseguire i comandi /set e /info.\n\n/set \t- permette di controllare il caricabatterie: Pausa, Ripresa, Blocco, Sblocco /info per ottenere informazioni sul caricabatterie come le statistiche e le informazioni attuali sul punto di ricarica /help mostra la guida.\n\n\n",

    //INFO
    "ChooseInfo": "Scegliere un'opzione ",
    "StatusInfo": "🚙 Stato attuale",
    "StadisticsInfo": "📊 Statistiche",
    "InstensityInfo": "⚡Valore di intensità⚡",
    "CurrentHousePower": "🏠⚡ Consumo di corrente",
    "ScheduleInfo": "⏰ Valori di programmazione",
    "PowerLabel": "Potenza",
    "EnergyLabel": "Energia",
    "TimeLabel": "Durata",
    "IntensityLabel": "Intensità",
    "HousePowerLabel": "Consumo della casa",
    "SolarLabel": "Produzione solare",
    "UpdatedLabel": "Aggiornato",
    "Refresh": "🔄 Aggiorna",
    "LastSessions": "📊 Ultime ricariche",
    "Total": "Totale",
    "NoSessions": "Non ci sono ancora ricariche registrate.",
    "StatsOwnerOnly": "📊 Le statistiche sono disponibili solo per il proprietario del caricatore. Questo dispositivo è condiviso con te come ospite.",
    "StateUnavailable": "ℹ️ Questo dispositivo non indica lo stato di ricarica.",
    "ChargingInformation" : "🔋Informazioni di carico🔋",

    //SET
    "PauseMode": "Pausa",
    "ResumeMode": "Continuare",
    "LockMode": "Disattivare",
    "UnLockMode": "Abilitazione",
    "IntensityMenu": "🎚️ Intensità",
    "ChooseIntensity": "Scegli l'intensità massima di ricarica:",
    "IntensitySet": "✅ Intensità impostata a {value} A",
    "SolarMenu": "☀️ Modalità solare",
    "ChooseSolarMode": "Modalità di ricarica fotovoltaica e controllo dinamico della potenza:",
    "FvMode0": "FV + potenza minima",
    "FvMode1": "Solo eccedenza FV",
    "FvMode2": "Potenza massima",
    "SolarModeSet": "✅ Modalità cambiata: {value}",
    "DynamicOn": "Dinamico: attiva",
    "DynamicOff": "Dinamico: disattiva",
    "DynamicEnabled": "✅ Controllo dinamico attivato",
    "DynamicDisabled": "✅ Controllo dinamico disattivato",
    "Back": "⬅️ Indietro",

    //ERROR
    "ErrorOperation": "Non è stato possibile completare l'operazione di cui sopra. Verificare che il caricabatterie sia collegato correttamente alla rete e che il funzionamento sia corretto",

    //STATUS
    "Disconnected": "🚫 Il caricabatterie è scollegato da internet 🚫",
    "Paused": "⏸️ Caricabatterie in pausa ⏸️",
    "Charging": "🔋🚘 Il caricatore è collegato al veicolo e sta caricando 🔋🚘",
    "Waiting": "🚘 Il caricatore è collegato al veicolo ed è in modalità standby 🚘",
    "Locked": "🔒 Caricabatterie disabilitato 🔒",
    "StandBy": "🚙 Aspetto del veicolo 🚙",
    "Programed": "⏰ Caricabatterie programmato ⏰",

    //STADISTICS
    "Start": "▶️",
    "TimingCharging": "🏁",
    "Energy": "🔋🚘",
    "Cost": "💰",
    "CoCost": "🌿🌏",

    //SCHEDULE
    "day1": "Lunedì, \t",
    "day2": "Lunedì, \t",
    "day3": "Mercoledì, \t",
    "day4": "Giovedì, \t",
    "day5": "Venerdì, \t",
    "day6": "Sabato, \t",
    "day7": "Domenica\t",
    "days": "\nGiorni : \t",

    "FirstNoProgramed": "Il tuo primo timer è disabilitato ❌ ",
    "SecondNoProgramed": "Il secondo timer è disattivato ❌",
    "Timer1": "Timer 1\n",
    "Timer2": "Timer 2\n",
    "allweek": "Da lunedì a domenica",
    "schedule": "Il vostro programma inizia a ",
    "scheduleOne": " e termina a ",
    "scheduleTWo": "VEDI PROGRAMMA",

};
