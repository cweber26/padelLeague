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
    if (!isMatchCancel()) {
        var oldPlayer = getPlayerWithMail(desisteurMail);
        if (parametersMap.get("numberPlayerInMatch") == parametersMap.get("numberPlayerMatch") && parametersMap.get("numberPlayerInWaitingList") > 0) {
            //the match was full and a least a player was in waiting list
            var newPlayer = getNewPlayerInCompo();
            // we get the new player
            if (isParameterBlank("mailSendingReminder")) {
                sendMail(newPlayer.mail, "Tu es sélectionné pour le match " + matchDayGapInFrench(true) + " en raison d'un désitement", getBodyMailReminder(newPlayer, true));
            } else if (isParameterBlank("mailSendingConfirmation")) {
                sendRemindMailForAPlayer(newPlayer, true);
            } else {
                sendConfirmMailForAPlayer(newPlayer, true);
            }
            sendMailSimple("Remplacement : " + oldPlayer.fullName + " s'est désité pour le match " + matchDayGapInFrench(true),
                "<h4>" + oldPlayer.fullName + " s'est désité pour le match " + matchDayGapInFrench(true) + "</h4><h4>" + newPlayer.fullName + " est dispo pour le remplacer</h4>");
        } else {
            var nbAvailableSlotsDesistement = (parametersMap.get("numberAvailableSlotInMatch")+1);
            sendMailSimple("Alerte : " + oldPlayer.fullName + " s'est désité pour le match " + matchDayGapInFrench(true) + " il manque " + nbAvailableSlotsDesistement + " joueur(s) pour le match", "<h4>" + oldPlayer.fullName + " s'est désité pour le match " + matchDayGapInFrench(true) + "</h4><h4>Il manque " + nbAvailableSlotsDesistement + " joueur(s)</h4>");
        }
        updateCalendarEvent();
    }
}