// noinspection JSUnusedGlobalSymbols
function saveScore(scoreValue) {
    if (scoreValue.rouge && scoreValue.bleu) {
        var row = sheetResult.getRange("A1:A").getValues().filter(String).length + 2;
        var players = playersInTheMatchForFinalCompo();
        if (sheetResult.getRange(row - 1, 1).getValue().getTime() != parametersMap.get("nextMatchDate").getTime()) {
            sheetResult.getRange(row, 1).setValue(parametersMap.get("nextMatchDate"));
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
        } else if (sheetResult.getRange(row - 1, 1).getValue().getTime() == parametersMap.get("nextMatchDate").getTime()) {
            row = row - 1;
        }
        sheetResult.getRange(row, 12).setValue(scoreValue.rouge);
        sheetResult.getRange(row, 13).setValue(scoreValue.bleu);
        updateParameterValue("lastScoreRed", scoreValue.rouge);
        updateParameterValue("lastScoreBlue", scoreValue.bleu);
        logRunDate("scoreSaved");
        stats(players);

    }
}