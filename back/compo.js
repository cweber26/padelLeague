function loadPageCompo() {
    var players = [];
    var confirmations = [];
    var effectif = "";
    var listeAttente = "";
    if (parametersMap.get("numberPlayerInMatch") > 0) {
        var data = playersInTheMatchForFinalCompo();
        data.forEach(function (p) {
            players.push(p[1]);
            confirmations.push(p[10]);
            if (p[0]) {
                effectif += "<tr>"
                    + "<td>" + p[9] + "</td>"
                    + "<td>" + p[0] + "</td>"
                    + "<td>" + p[1] + "</td>"
                    + "<td>" + p[6] + "</td>"
                    + "<td>" + p[7] + "</td>"
                    + "<td>" + getSerieLumieres(p[8]) + "</td>"
                    + "</tr>";
            }
        });
    }
    if (parametersMap.get("numberPlayerInWaitingList") > 0) {
        playersInWaitingListMail().forEach(function (m) {
            Logger.log(m);
            var player = getPlayerWithMail(m);
            listeAttente += "<tr>"
                + "<td>" + player.fullName + "</td>"
                + "</tr>";
        });
    }

    return render("front/page/compo", "Barbeuc : Composition", {
        mail: param.mail,
        key: param.key,
        date: matchDayGapInFrench(true),
        compo: players,
        inscriptionPhase: isParameterNotBlank("mailSendingPrio1"),
        confirmationPhase: isParameterNotBlank("mailSendingConfirmation"),
        scoreSaved: isParameterNotBlank("scoreSaved"),
        confirmations: confirmations,
        effectif: effectif,
        listeAttente: listeAttente,
        admin: param.isAdmin,
        cancelMatch: parametersMap.get("isMatchCancel"),
        testing: isParameterTrue("modeTest"),
        scoreRed: parametersMap.get("lastScoreRed"),
        scoreBlue: parametersMap.get("lastScoreBlue")
    });
}


function playersInTheMatchForFinalCompo() {
    if (parametersMap.get("numberPlayerInMatch") > 0) {
        return sheetComposition.getRange(13, 2, parametersMap.get("numberPlayerMatch"), 11).getValues();
    }
}