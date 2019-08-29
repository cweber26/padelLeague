function actionsToDoIfDesistement() {
    if (rangeCancelMatch.isBlank()) {
        if (nbPlayersAvailable == nbMaxPlayers && nbPlayersWaiting > 0) {
            var player = getNewPlayerInCompo();
            Logger.log(player);
            if (rangeReminder.isBlank()) {
                sendMail(player.mail, "Tu es sélectionné pour le match " + matchDayGapInFrench(true) + " en raison d'un désitement", getBodyMailReminder(player, true));
            } else {
                if (rangeConfirmation.isBlank()) {
                    sendRemindMailForAPlayer(player, true);
                } else {
                    sendConfirmMailForAPlayer(player, true);
                }
                updateMatch();
                deleteCalendarEvent();
                createCalendarEvent();
                sendMail(mailsAdmin, "Alerte : l'effectif de l'équipe a changé", "<h4> nouveau joueur : " + player.fullname);
            }
        } else {
            sendMail(mailsAdmin, "Alerte : il manque " + nbAvailableSlots + " joueur(s) pour le match " + matchDayGapInFrench(true),
                "<h2>Il manque " + nbAvailableSlots + " joueur(s) pour le match " + matchDayGapInFrench(true) + "</h2>");
        }
    }
}