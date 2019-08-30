function controlAndCancelOrRelaunch() {
    if (rangeCancelMatch.isBlank() && rangeControl.isBlank()) {
        if ((nbPlayersAvailable > 0 && nbPlayersAvailable < nbLimitPlayers)) {
            Logger.log("Automatic cancel. nbPlayersAvailable : "+nbPlayersAvailable+" / nbLimitPlayers : "+nbLimitPlayers);
            cancelMatchAndSendMail(true);



            sendMailForAdmin("Pense à annuler le match " + matchDayGapInFrench(true),

                "<h1><a href='https://my.urbansoccer.fr/user'>UrbanSoccer</a></h1>");

        } else if (nbPlayersAvailable >= nbLimitPlayers && nbPlayersAvailable < nbMaxPlayers) {
            Logger.log("Automatic relaunch. nbPlayersAvailable : "+nbPlayersAvailable+" / nbLimitPlayers : "+nbLimitPlayers);
            sendInscriptionMailForAPrio(3);
        }
        logRunDate("control");
    }
}