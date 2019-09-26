function controlAndCancelOrRelaunch() {
    if (!isMatchCancel() && isParameterBlank("controlDone")) {
        if ((parametersMap.get("numberPlayerInMatch") > 0 && parametersMap.get("numberPlayerInMatch") < parametersMap.get("minPlayerForAutoCancelation"))) {
            cancelMatchAndSendMail(true);
            sendMailForAdmin("Pense à annuler la réservation du match " + matchDayGapInFrench(true), "<h2>Pense à annuler la réservation " + parametersMap.get("nextMatchStadiumName") + "</h2>");

        } else if (parametersMap.get("numberPlayerInMatch") >= parametersMap.get("minPlayerForAutoCancelation") && parametersMap.get("numberPlayerInMatch") < parametersMap.get("numberPlayerMatch")) {
            sendInscriptionMailForAPrio(3);
        }
        updateParameterValue("controlDone", new Date(Date.now()));
    }
}