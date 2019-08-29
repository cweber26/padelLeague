function saveMatchCompo() {
    rangeMatchDate.setValue(nextMatchDate);
    rangeMatchCompo.setValues(rangeCompoUpdated.getValues());
    rangeScoreRed.clearContent();
    rangeScoreBlue.clearContent();
}

function updateMatchCompo() {
    if(!rangeMatchDate.isBlank()) {
        rangeMatchDate.setValue(nextMatchDate);
        rangeMatchCompo.setValues(rangeCompoUpdated.getValues());
    }
}


function loadPageCompo() {
    var players = [];
    var confirmations = [];
    var effectif = "";
    var listeAttente = "";
    if (nbPlayersAvailable > 0) {
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
    if (nbPlayersWaiting > 0) {
        playersInWaitingListMail().forEach(function (m) {
            var player = getPlayerWithMail(m);
            listeAttente += "<tr>"
                + "<td>" + player.fullName + "</td>"
                + "</tr>";
        });
    }
    var score = {};
    if (!rangeScoreBlue.isBlank()) {
        score.blue = rangeScoreBlue.getValue();
    }
    if (!rangeScoreRed.isBlank()) {
        score.red = rangeScoreRed.getValue();
    }

    return render("front/html/compo", "Barbeuc : Composition", {
        mail: param.mail,
        key: param.key,
        date: matchDayGapInFrench(true),
        compo: players,
        inscriptionPhase: !rangeSending1.isBlank(),
        confirmationPhase: !rangeReminder.isBlank(),
        confirmations: confirmations,
        effectif: effectif,
        listeAttente: listeAttente,
        admin: param.isAdmin,
        score: score,
        url: ScriptApp.getService().getUrl()
    });
}