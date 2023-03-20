module.exports = {

    //TOKEN VALUES
    "TokenHelp": "Pour obtenir votre clé de jeton, rendez-vous dans la rubrique “Clave API” du portail web V2C Cloud depuis votre compte. \n\nEnsuite, cliquez sur l'option “Generar Token” et, une référence alphanumérique s'affichera, cet ID sera votre clé de jeton. \n\n",

    "TokenOK": "Jeton inséré avec succès !\n\nSélectionnez le e-Charger que vous souhaitez configurer. Pour ce faire, entrez après la commande /device suivi d'un espace, le deviceId du e-Charger souhaité.\n\nPar exemple \n/device ABCDEFG ",
    "TokenKO": "La clé de jeton n'est pas valide.\nSi vous ne savez pas comment l'obtenir, tapez /token.\nEncaso si vous l'avez, entrez-le après la commande /token",
    "PairedList": "Liste de vos appareils couplés",

    //DEVICEID
    "AddDeviceHelp": "Vous devez indiquer un ajout d'appareil avec le format suivant à gauche /device <<deviceId>>\n\nPour connaître la liste des appareils couplés utiliser la commande /list",
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
    "ChargingInformation" : "🔋Informations de charge🔋",

    //SET
    "PauseMode": "Pause",
    "ResumeMode": "Reprendre",
    "LockMode": "Désactiver",
    "UnLockMode": "Activer",

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
