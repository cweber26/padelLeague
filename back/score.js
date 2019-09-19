function saveTeam() {
    var row = sheetResult.getRange("A1:A").getValues().filter(String).length + 2;
    if (sheetResult.getRange(row - 1, 1).getValue().getTime() == parametersMap.get("nextMatchDate").getTime()) {
        row = row -1;
    } else {
        sheetResult.getRange(row, 1).setValue(parametersMap.get("nextMatchDate"));
    }
    var players = playersInTheMatchForFinalCompo();
    sheetResult.getRange(row, 2).setValue(players[0][0]);
    sheetResult.getRange(row, 3).setValue(players[1][0]);
    sheetResult.getRange(row, 4).setValue(players[2][0]);
    sheetResult.getRange(row, 5).setValue(players[3][0]);
    sheetResult.getRange(row, 6).setValue(players[4][0]);
    sheetResult.getRange(row, 7).setValue(players[5][0]);
    sheetResult.getRange(row, 8).setValue(players[6][0]);
    sheetResult.getRange(row, 9).setValue(players[7][0]);
    sheetResult.getRange(row, 10).setValue(players[8][0]);
    sheetResult.getRange(row, 11).setValue(players[9][0]);
    logRunDate("teamSaved");
}

// noinspection JSUnusedGlobalSymbols
function saveScore(scoreValue) {
    if (scoreValue.rouge && scoreValue.bleu) {
        var row = sheetResult.getRange("A1:A").getValues().filter(String).length + 1;
        var players = playersInTheMatchForFinalCompo();
        if (sheetResult.getRange(row, 1).getValue().getTime() == parametersMap.get("nextMatchDate").getTime()) {
            sheetResult.getRange(row, 12).setValue(scoreValue.rouge);
            sheetResult.getRange(row, 13).setValue(scoreValue.bleu);
            logRunDate("scoreSaved");
            stats(players);
        }
    }
}


function sendScoreMail() {
    if (!isMatchCancel()) {
        var mails = parametersMap.get("adminMailList").split(',');
        for (var i in mails) {
            var player = getPlayerWithMail(mails[i]);
            sendScoreMailForAPlayer(player);
        }
    }
}

function sendScoreMailForAPlayer(player) {
    sendMail(player.mail, "Score pour le match du " + parametersMap.get("nextMatchDateFrench"), includeWithArgs("front/mail/mailScore", {
        date: matchDayGapInFrench(true),
        compo: getCompoPlayersListForMail(),
        urlMail: getUrlMail(player)
    }));
}