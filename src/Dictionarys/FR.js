module.exports = {

    //COMMANDS MENU
    "CmdToken": "Saisir votre token V2C Cloud",
    "CmdList": "Lister vos chargeurs",
    "CmdDevice": "Choisir le chargeur à utiliser",
    "CmdSet": "Contrôler le chargeur",
    "CmdInfo": "État et informations du chargeur",
    "CmdHelp": "Aide",
    "TokenHelpUrl": "https://v2charge.com/fr/comment-puis-je-avoir-mon-identifiant-token-pour-utiliser-l-api-rest-cloud/",
    "TokenMessageDeleted": "🔒 J'ai supprimé votre message contenant le token pour qu'il ne reste pas dans la conversation.",


    //TOKEN VALUES
    "TokenHelp": "Pour obtenir votre clé de jeton, rendez-vous dans la rubrique “Clave API” du portail web V2C Cloud depuis votre compte. \n\nEnsuite, cliquez sur l'option “Generar Token” et, une référence alphanumérique s'affichera, cet ID sera votre clé de jeton. \n\n",

    "TokenOK": "✅ Token enregistré avec succès.",
    "TokenKO": "La clé de jeton n'est pas valide.\nSi vous ne savez pas comment l'obtenir, tapez /token.\nEncaso si vous l'avez, entrez-le après la commande /token",
    "PairedList": "Liste de vos appareils couplés",
    "ChooseDevice": "🔌 Choisissez le chargeur que vous souhaitez utiliser :",
    "NoDevices": "Aucun chargeur n'est associé à votre compte V2C Cloud.",

    //DEVICEID
    "AddDeviceHelp": "Choisissez d'abord un chargeur avec /list (ou tapez /device suivi de son identifiant, par ex. /device ABC123).",
    "AddDeviceOK": "L'appareil suivant a été associé avec succès :",
    "DeviceActions": "Pour afficher l'état du chargeur, utilisez la commande positive : /info.\n\nPour modifier l'état ou les paramètres du loader utiliser la commande    /set",
    "AddDeviceKO": "L'appareil suivant n'a pas pu être couplé :",
    //HELP
    "Help": "\n Salut! Bienvenue sur V2C Bot 👋👋 \n\n\nPour travailler, j'ai besoin que vous indiquiez le jeton d'identification /token et le deviceID du chargeur /device.\n\nUne fois que vous aurez mis le jeton, nous obtiendrons une liste avec les bornes de recharge disponibles.\n\nPour obtenir à nouveau la liste, utilisez la commande /list.\n\nSi vous ne savez pas comment obtenir le jeton, exécutez la commande /token sans rien et vous obtiendrez un guide.\n\nLorsque vous sélectionnez le chargeur, vous pourrez exécuter les commandes /set et /info.\n\n/set \t- Permet de contrôler le chargeur : Pause, Reprendre, Verrouiller, Déverrouiller\n\n/info \t- Pour obtenir des informations sur le chargeur telles que ses données statistiques et des informations actuelles sur votre point de charge\n \n/help \t- Afficher l'aide\n\n\n    ",

    //INFO
    "ChooseInfo": "Choisir une option ",
    "StatusInfo": "🚙 État actuel ",
    "StadisticsInfo": "📊 Statistiques ",
    "InstensityInfo": "⚡Valeur d'intensité ⚡",
    "CurrentHousePower": "🏠⚡ Consommation de courant ",
    "ScheduleInfo": "⏰ Valeurs de programmation ",
    "PowerLabel": "Puissance",
    "EnergyLabel": "Énergie",
    "TimeLabel": "Durée",
    "IntensityLabel": "Intensité",
    "HousePowerLabel": "Consommation de la maison",
    "SolarLabel": "Production solaire",
    "UpdatedLabel": "Mis à jour",
    "Refresh": "🔄 Actualiser",
    "LastSessions": "📊 Dernières recharges",
    "Total": "Total",
    "NoSessions": "Aucune recharge n'a encore été enregistrée.",
    "StateUnavailable": "ℹ️ Cet appareil n'indique pas d'état de recharge.",
    "ChargingInformation" : "🔋Informations de charge🔋",

    //SET
    "PauseMode": "Pause",
    "ResumeMode": "Reprendre",
    "LockMode": "Désactiver",
    "UnLockMode": "Activer",
    "IntensityMenu": "🎚️ Intensité",
    "ChooseIntensity": "Choisissez l'intensité de charge maximale :",
    "IntensitySet": "✅ Intensité réglée sur {value} A",
    "SolarMenu": "☀️ Mode solaire",
    "ChooseSolarMode": "Mode de recharge photovoltaïque et contrôle dynamique de puissance :",
    "FvMode0": "PV + puissance minimale",
    "FvMode1": "Surplus PV uniquement",
    "FvMode2": "Puissance maximale",
    "SolarModeSet": "✅ Mode modifié : {value}",
    "DynamicOn": "Dynamique : activer",
    "DynamicOff": "Dynamique : désactiver",
    "DynamicEnabled": "✅ Contrôle dynamique activé",
    "DynamicDisabled": "✅ Contrôle dynamique désactivé",
    "Back": "⬅️ Retour",

    //ERROR
    "ErrorOperation": "L'opération ci-dessus n'a pas pu être effectuée. Assurez-vous que le chargeur est correctement connecté au réseau et que le fonctionnement est correct",


    //STATUS
    "Disconnected": "🚫 Le chargeur est déconnecté d'internet 🚫",
    "Paused": "⏸️ Chargeur en pause ⏸️",
    "Charging": "🔋🚘 Le chargeur est connecté à votre véhicule et se charge 🔋🚘",
    "Waiting": "🚘 Le chargeur est connecté à votre véhicule et en mode veille 🚘",
    "Locked": "🔒 Chargeur désactivé 🔒",
    "StandBy": "🚙 en attente de véhicule 🚙",
    "Programed": "⏰ Chargeur programmé ⏰",

    //STADISTICS
    "Start": "▶️",
    "TimingCharging": "🏁",
    "Energy": "🔋🚘",
    "Cost": "💰",
    "CoCost": "🌿🌏",

    //Days
    "day1": "Lundi,\t",
    "day2": "Mardi,\t",
    "day3": "Mercredi,\t",
    "day4": "Jeudi,\t",
    "day5": "Vendredi,\t",
    "day6": "Samedi,\t",
    "day7": "Dimanche\t",
    "days": "\nJours :\t",

    "Timer1": "Timer 1⏱️\n",
    "Timer2": "Timer 2⏱️\n",
    "allweek": "Du lundi au dimanche",
    "FirstNoProgramed": "Votre premiére minuterie n'est pas programmée ❌",
    "SecondNoProgramed": "Votre deuxième minuterie n'est pas programmée ❌",
    "schedule": "Votre emploi du temps commence à partir de\t",
    "scheduleOne": "\tet se termine à\t",
    "scheduleTWo": "Voir le programme",

};
