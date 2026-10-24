module.exports = {

    //COMMANDS MENU
    "CmdToken": "V2C-Cloud-Token eingeben",
    "CmdList": "Wallboxen auflisten",
    "CmdDevice": "Wallbox auswählen",
    "CmdSet": "Wallbox steuern",
    "CmdInfo": "Status und Infos der Wallbox",
    "CmdHelp": "Hilfe",
    "TokenHelpUrl": "https://v2charge.com/de/wie-erhalte-ich-meine-token-id-fuer-die-nutzung-der-rest-cloud-api/",
    "TokenMessageDeleted": "🔒 Ich habe Ihre Nachricht mit dem Token gelöscht, damit er nicht im Chat gespeichert bleibt.",


    //TOKEN VALUES
    "TokenHelp":"Um Ihren Token-Schlüssel zu erhalten, greifen Sie über Ihr Konto auf den Abschnitt VAPI-Schlüssel“ des V2C Cloud-Webportals zu. \n\n Dann klicken Sie auf die Option “Token generieren“ und es wird eine alphanumerische Referenz angezeigt, die Ihren Token-Schlüssel darstellt. \n\n",
    "TokenOK": "✅ Token erfolgreich gespeichert.",
    "TokenKO": "Der Token-Schlüssel ist ungültig.\n Wenn Sie nicht wissen, wie Sie ihn erhalten, geben Sie /token ein.\n Wenn Sie ihn haben, geben Sie ihn nach dem Befehl /token ein. ",
    "PairedList": "Liste der gekoppelten Geräte",
    "ChooseDevice": "🔌 Wählen Sie die Wallbox, die Sie verwenden möchten:",
    "NoDevices": "Mit Ihrem V2C-Cloud-Konto sind keine Wallboxen verknüpft.",

    //DEVICEID
    "AddDeviceHelp": "Wählen Sie zuerst eine Wallbox mit /list (oder geben Sie /device gefolgt von ihrer ID ein, z. B. /device ABC123).",
    "AddDeviceOK": "Das folgende Gerät wurde erfolgreich gekoppelt: ",
    "DeviceActions": "Um den Status des Ladegeräts anzuzeigen, verwenden Sie den Befehl /info\n\n Um den Status oder die Parameter des Ladegeräts zu ändern, verwenden Sie den Befehl /set ",
    "AddDeviceKO": "Das folgende Gerät konnte nicht verknüpft werden: ",
    //HELP
    "Help": "\nHallo! Willkommen beim V2C Bot 👋👋 \n\n\nUm zu funktionieren, müssen Sie den Identifikations-Token /token und die deviceID des Ladegeräts /device angeben.\n\n Sobald Sie den Token eingeben, erhalten wir eine Liste mit den verfügbaren Ladepunkten. \n\n Wenn Sie das Ladegerät auswählen, können Sie die Befehle /set und /info ausführen.\n\n /set \t- Ermöglicht die Steuerung des Ladegeräts: Pause, Fortsetzen, Sperren, Aufheben der Sperrung, Aufheben der Sperrung/info Um Informationen über das Ladegerät zu erhalten, wie z.B. seine statistischen Daten und aktuelle Informationen über Ihren Ladepunkt. \n\n /help \t- Unterstützung anzeigen \n\n\n",

    //INFO
    "ChooseInfo": "Wählen Sie eine Option ",
    "StatusInfo": "🚙 Aktueller Stand",
    "StadisticsInfo": "📊 Statistik",
    "InstensityInfo": "⚡Intensitätswert⚡",
    "CurrentHousePower": "🏠⚡ Stromverbrauch ",
    "ScheduleInfo": "⏰ Werte programmieren ",
    "PowerLabel": "Leistung",
    "EnergyLabel": "Energie",
    "TimeLabel": "Dauer",
    "IntensityLabel": "Stromstärke",
    "HousePowerLabel": "Hausverbrauch",
    "SolarLabel": "Solarproduktion",
    "UpdatedLabel": "Aktualisiert",
    "Refresh": "🔄 Aktualisieren",
    "LastSessions": "📊 Letzte Ladevorgänge",
    "Total": "Gesamt",
    "NoSessions": "Es sind noch keine Ladevorgänge vorhanden.",
    "StatsOwnerOnly": "📊 Statistiken sind nur für den Eigentümer der Wallbox verfügbar. Dieses Gerät wurde mit Ihnen als Gast geteilt.",
    "StateUnavailable": "ℹ️ Dieses Gerät meldet keinen Ladezustand.",
    "ChargingInformation" : "🔋Ladeinformationen🔋",

    //SET
    "PauseMode": "Pause",
    "ResumeMode": "Lebenslauf",
    "LockMode": "Deaktivieren Sie ",
    "UnLockMode": "Aktivieren Sie ",
    "IntensityMenu": "🎚️ Stromstärke",
    "ChooseIntensity": "Wählen Sie die maximale Ladestromstärke:",
    "IntensitySet": "✅ Stromstärke auf {value} A eingestellt",
    "SolarMenu": "☀️ Solarmodus",
    "ChooseSolarMode": "PV-Lademodus und dynamische Leistungsregelung:",
    "FvMode0": "PV + Mindestleistung",
    "FvMode1": "Nur PV-Überschuss",
    "FvMode2": "Maximale Leistung",
    "SolarModeSet": "✅ Modus geändert: {value}",
    "DynamicOn": "Dynamisch: an",
    "DynamicOff": "Dynamisch: aus",
    "DynamicEnabled": "✅ Dynamische Regelung aktiviert",
    "DynamicDisabled": "✅ Dynamische Regelung deaktiviert",
    "Back": "⬅️ Zurück",

    //ERROR
    "ErrorOperation": "Der obige Vorgang konnte nicht abgeschlossen werden. Vergewissern Sie sich, dass das Ladegerät korrekt an das Netz angeschlossen ist und einwandfrei funktioniert ",

    //STATUS
    "Disconnected": "🚫 Das Ladegerät ist nicht mit dem Internet verbunden 🚫",
    "Paused": "⏸️ Ladegerät pausiert ⏸️",
    "Charging": "🔋🚘 Ladegerät ist mit Ihrem Fahrzeug verbunden und lädt 🔋🚘",
    "Waiting": "🚘 Ladegerät ist an Ihr Fahrzeug angeschlossen und befindet sich im Standby-Modus 🚘",
    "Locked": "🔒 Ladegerät Deaktiviert 🔒",
    "StandBy": "🚙 Warten auf das Fahrzeug 🚙",
    "Programed": "⏰ Ladegerät geplant ⏰",

    //STADISTICS
    "Start": "▶️",
    "TimingCharging": "🏁",
    "Energy": "🔋🚘",
    "Cost": "💰",
    "CoCost": "🌿🌏",

    "day1": "Montag,\t",
    "day2": "Dienstag,\t",
    "day3": "Mittwoch,\t",
    "day4": "Donnerstag,\t",
    "day5": "Freitag,\t",
    "day6": "Samstag,\t",
    "day7": "Sonntag\t",
    "days": "\nTage: \t",
    "allweek": "Montag bis Sonntag",

    "Timer1": "Zeitschaltuhr 1\n",
    "Timer2": "Zeitschaltuhr 2\n",
    "FirstNoProgramed": "Ihr erster Timer ist deaktiviert ❌",
    "SecondNoProgramed": "Ihr zweiter Timer ist deaktiviert ❌",

    "schedule": "Ihr Programm beginnt bei\t",
    "scheduleOne": "\tund endet bei\t",
    "scheduleTWo": "PROGRAMM SEHEN",


};
