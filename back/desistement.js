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
        if (parametersMap.get("numberPlayerInMatch") == parametersMap.get("numberPlayerMatch") && parametersMap.get("numberPlayerInWaitingList") > 0) {
            //the match was full and a least a player was in waiting list
            var player = getNewPlayerInCompo();
            // we get the new player
            if (isParameterBlank("mailSendingReminder")) {
                sendMail(player.mail, "Tu es sélectionné pour le match " + matchDayGapInFrench(true) + " en raison d'un désitement", getBodyMailReminder(player, true));
            } else if (isParameterBlank("mailSendingConfirmation")) {
                sendRemindMailForAPlayer(player, true);
            } else {
                sendConfirmMailForAPlayer(player, true);
            }
            var fullName = player.fullName;
            sendMailForAdmin("Alerte : l'effectif de l'équipe a changé",
                "<h4>" + desisteurMail + " s'est désité pour le match " + matchDayGapInFrench(true) + "</h4><h4>" + fullName + " est dispo pour le remplacer</h4>");
        } else {
            var nbAvailableSlotsDesistement = (parametersMap.get("numberAvailableSlotInMatch")+1);
            sendMailForAdmin("Alerte : il manque " + nbAvailableSlotsDesistement + " joueur(s) pour le match " + matchDayGapInFrench(true),
                "<h4>" + desisteurMail + " s'est désité pour le match " + matchDayGapInFrench(true) + "</h4><h4>Il manque " + nbAvailableSlotsDesistement + " joueur(s)</h4>");
        }
    }
    updateCalendarEvent();
}