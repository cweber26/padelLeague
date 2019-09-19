function loadPageResultat() {
    var players = [];
    var matchDates = sheetResult.getRange("A1:A").getValues();
    var row = sheetResult.getRange("A1:A").getValues().filter(String).length + 1;
    var date;
    if(param.matchDate) {
        date = param.matchDate;
    } else {
        date = getDateFormat(sheetResult.getRange(row, 1).getValue());
    }

    var matchDateSelect = "";
    Logger.log(matchDates);
    for (var i = 3; i <= row+1; i++){
        Logger.log(matchDates[i][0]);
        if(matchDates[i][0]){
            var dateFormated = getDateFormat(matchDates[i][0]);
            Logger.log(dateFormated);
            if(dateFormated == date) {
                row = i + 1;
                matchDateSelect += "<option selected>"+dateFormated+"</option>";
            } else {
                matchDateSelect += "<option>"+dateFormated+"</option>";
            }
        }
    }
    var playersList = sheetResult.getRange(row, 2, 1, 10).getValues();
    playersList[0].forEach(function (p) {
        players.push(getPlayerWithFullName(p).nickName);
    });
    var scoreRed = sheetResult.getRange(row, 12).getValue();
    var scoreBlue = sheetResult.getRange(row, 13).getValue();

    return render("front/page/resultat", "Barbeuc : Resultat", {
        mail: param.mail,
        key: param.key,
        matchDateSelect: matchDateSelect,
        date: date,
        compo: players,
        admin: param.isAdmin,
        testing: isParameterTrue("modeTest"),
        scoreRed: scoreRed,
        scoreBlue: scoreBlue
    });
}
