function checkIfDesistement(parameter, playersInTheMatchMailBefore) {
    if (parameter.answer == "Non") {
        for (var i in playersInTheMatchMailBefore) {
            if (playersInTheMatchMailBefore[i] == parameter.mail) {
                actionsToDoIfDesistement();
            }
        }
    }
}

function actionsToDoIfDesistement() {
    if (rangeCancelMatch.isBlank()) {
        if (nbPlayersAvailable == nbMaxPlayers && nbPlayersWaiting > 0) {
            //the match was full and a least a player was in waiting list
            var player = getNewPlayerInCompo();
            // we get the new player
            Logger.log(player);
            if (rangeReminder.isBlank()) {
                sendMail(player.mail, "Tu es sélectionné pour le match " + matchDayGapInFrench(true) + " en raison d'un désitement", getBodyMailReminder(player, true));
            } else if (rangeConfirmation.isBlank()) {
                sendRemindMailForAPlayer(player, true);

            } else {
                sendConfirmMailForAPlayer(player, true);
            }
            var fullName = player.fullName;
            sendMailForAdmin("Alerte : l'effectif de l'équipe a changé", "<h4> nouveau joueur : " + fullName + "</h4>");
        } else {
            nbAvailableSlots +=1;
            sendMailForAdmin("Alerte : il manque " + nbAvailableSlots + " joueur(s) pour le match " + matchDayGapInFrench(true),
                "<h2>Il manque " + nbAvailableSlots + " joueur(s) pour le match " + matchDayGapInFrench(true) + "</h2>");
        }
    }
    updateMatchCompo();
    updateCalendarEvent();
}