function loadPageCompo() {
    var players = [];
    var inscriptionTable = [];
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
    if (param.isAdmin && parametersMap.get("numberPlayerInMatch") > 0) {
        inscriptions().forEach(function (i) {
            if (i[0]) {
                inscriptionTable += "<tr>"
                    + "<td>" + i[0] + "</td>"
                    + "<td>" + i[1] + "</td>"
                    + "<td>" + i[2] + "</td>"
                    + "<td>" + i[3] + "</td>"
                    + "<td>" + Utilities.formatDate(i[4], "Europe/Paris", "MM/dd/yy HH:mm") + "</td>";
                if (i[5]) {
                    inscriptionTable += "<td>" + i[5] + "</td></tr>"
                } else {
                    inscriptionTable += "<td></td></tr>";
                }
            }
        });
    }
    if (parametersMap.get("numberPlayerInWaitingList") > 0) {
        playersInWaitingListMail().forEach(function (m) {
            Logger.log(m);
            var player = getPlayerWithMail(m);
            if(player) {
                listeAttente += "<tr>"
                    + "<td>" + player.fullName + "</td>"
                    + "</tr>";
            } else {
                listeAttente += "<tr>"
                    + "<td>" + m + "</td>" //TODO else to prevent error in case of missing player for an mail
                    + "</tr>";
            }
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
        scoreBlue: parametersMap.get("lastScoreBlue"),
        inscriptionTable: inscriptionTable
    });
}


function playersInTheMatchForFinalCompo() {
    if (parametersMap.get("numberPlayerInMatch") > 0) {
        return sheetComposition.getRange(13, 2, parametersMap.get("numberPlayerMatch"), 11).getValues();
    }
}

function inscriptions() {
    if (parametersMap.get("numberPlayerInMatch") > 0) {
        return sheetInscriptionFilter.getRange(1, 7).getDataRegion().getValues();
    }
}