function checkIfDesistement(parameter, playersInTheMatchMailBefore) {
    if (parameter.answer == "Non") {
        for (var i in playersInTheMatchMailBefore) {
            if (playersInTheMatchMailBefore[i] == parameter.mail) {
                actionsToDoIfDesistement(parameter.mail);
            }
        }
    }
}

function actionsToDoIfDesistement(desisteurMail) {
    var oldPlayer = getPlayerWithMail(desisteurMail);
    var newPlayer = getNewPlayerInCompo();
    reloadParameter();
    if (numberPlayerInMatch == numberPlayerMatch) {
        //the match was full and a least a player was in waiting list
        // we get the new player
        if (mailReminder=="") {
            sendMail(newPlayer.mail, "Tu es sélectionné pour le match " + matchDayGapInFrench(true) + " en raison d'un désitement", getBodyMailReminder(newPlayer, true));
        } else {
            sendRemindMailForAPlayer(newPlayer, true);
        }
        sendMailSimple("Remplacement : " + oldPlayer.name + " s'est désité pour le match " + matchDayGapInFrench(true),
            "<h4>" + oldPlayer.name + " s'est désité pour le match " + matchDayGapInFrench(true) + "</h4><h4>" + newPlayer.name + " est dispo pour le remplacer</h4>");
    } else {
        sendMailSimple("Alerte : " + oldPlayer.name + " s'est désité pour le match " + matchDayGapInFrench(true) + " il manque " + numberAvailableSlotInMatch + " joueur(s) pour le match", "<h4>" + oldPlayer.name + " s'est désité pour le match " + matchDayGapInFrench(true) + "</h4><h4>Il manque " + numberAvailableSlotInMatch + " joueur(s)</h4>");
    }
    updateCalendarEvent(newPlayer.mail, oldPlayer.mail);
}