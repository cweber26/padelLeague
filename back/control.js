function controlAndCancelOrRelaunch() {
    if (rangeCancelMatch.isBlank() && rangeControl.isBlank()) {
        if ((nbPlayersAvailable > 0 && nbPlayersAvailable < nbLimitPlayers)) {
            sendMailCancelMatch(true);
            sendMail(mailsAdmin, "Pense à annuler le match " + matchDayGapInFrench(true), "<h1><a href='https://my.urbansoccer.fr/user'>UrbanSoccer</a></h1>");
            rangeCancelMatch.setValue(true);
        } else if (nbPlayersAvailable >= nbLimitPlayers && nbPlayersAvailable < nbMaxPlayers) {
            sendInscriptionMailForAPrio(3);
        }
        logRunDate("control");
    }
}