function saveTeam() {
    var row = sheetResult.getRange("A1:A").getValues().filter(String).length + 2;
    if (sheetResult.getRange(row - 1, 1).getValue().getTime() == parametersMap.get("nextMatchDate").getTime()) {
        row = row - 1;
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
    var matchDates = sheetResult.getRange("A1:A").getValues();
    var lastRowDate = sheetResult.getRange("A1:A").getValues().filter(String).length + 1;
    var date = scoreValue.date;
    for (var i = lastRowDate + 1; i >= 3; i--) {
        if (matchDates[i][0]) {
            var dateFormated = getDateFormat(matchDates[i][0]);
            if (dateFormated == date) {
                sheetResult.getRange(i + 1, 12).setValue(scoreValue.rouge);
                sheetResult.getRange(i + 1, 13).setValue(scoreValue.bleu);
                var playersList = sheetResult.getRange(i + 1, 2, 1, 10).getValues();
                playersList[0].forEach(function (fullName) {
                    if(fullName) {
                        statsForAPlayer(fullName);
                    }
                });

                logRunDate("scoreSaved");
                break;
            }
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