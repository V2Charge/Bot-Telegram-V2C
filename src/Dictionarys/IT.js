module.exports = {

    //TOKEN VALUES
    "TokenHelp": "Per ottenere la chiave token, accedere alla sezione “Chiave API“ del portale web V2C Cloud dal proprio account.\n\nOuindi, fare clic sull'opzione “Generate Token“ (Genera token) e verrà visualizzato un riferimento alfanumerico, questo ID sarà la chiave del token. \n\n",
    "TokenOK": "Token inserito con successo! \n\nSelezionare il caricatore elettronico che si desidera configurare. A tal fine, dopo il comando /device seguito da uno spazio, inserire l'ID dispositivo del caricabatterie elettronico che si desidera configurare.",
    "TokenKO": "La chiave token non è valida.\n Se non si sa come ottenerla, digitare /token.\nSe la si possiede, inserirla dopo il comando /token.",
    "PairedList": "Elenco dei dispositivi accoppiati",

    //DEVICEID
    "AddDeviceHelp": "È necessario aggiungere un dispositivo nel seguente formato /device <<deviceId>> \n Per visualizzare l'elenco dei dispositivi accoppiati, utilizzare il comando /list.",
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
    "ChargingInformation" : "🔋Informazioni di carico🔋",

    //SET
    "PauseMode": "Pausa",
    "ResumeMode": "Continuare",
    "LockMode": "Disattivare",
    "UnLockMode": "Abilitazione",

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
