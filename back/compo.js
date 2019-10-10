function loadPageCompo() {
    var players = [];
    var listeAttente = "";
    if (parametersMap.get("numberPlayerInMatch") > 0) {
        playersInTheMatchMail().forEach(function (m) {
            var player = getPlayerWithMail(m);
            players.push(player.name);
        });
    }

    if (parametersMap.get("numberPlayerInWaitingList") > 0) {
        playersInWaitingListMail().forEach(function (m) {
            var player = getPlayerWithMail(m);
            if(player) {
                listeAttente += "<tr><td>" + player.name + "</td></tr>";
            }
        });
    }

    var tabTitle = "PadelLeague";

    return render("front/page/compo", tabTitle, {
        date: matchDayGapInFrench(true),
        compo: players,
        listeAttente: listeAttente
    });
}

