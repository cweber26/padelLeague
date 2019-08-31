function controlAndCancelOrRelaunch() {
    if (!isMatchCancel() && isParameterBlank("controlDone")) {
        if ((parametersMap.get("numberPlayerInMatch") > 0 && parametersMap.get("numberPlayerInMatch") < parametersMap.get("minPlayerForAutoCancelation"))) {
            cancelMatchAndSendMail(true);
            sendMailForAdmin("Pense à annuler le match " + matchDayGapInFrench(true),

                "<h1><a href='https://my.urbansoccer.fr/user'>UrbanSoccer</a></h1>");

        } else if (parametersMap.get("numberPlayerInMatch") >= parametersMap.get("minPlayerForAutoCancelation") && parametersMap.get("numberPlayerInMatch") < parametersMap.get("numberPlayerMatch")) {
            sendInscriptionMailForAPrio(3);
        }
        logRunDate("control");
    }
}