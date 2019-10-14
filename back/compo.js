function loadPageCompo() {
    var players = [];
    if (parametersMap.get("numberPlayerInMatch") > 0) {
        playersInTheMatchMail().forEach(function (m) {
            var player = getPlayerWithMail(m);
            players.push(player.name);
        });
    }

    var listeAttente = "";
    if (parametersMap.get("numberPlayerInWaitingList") > 0) {
        playersInWaitingListMail().forEach(function (m) {
            var player = getPlayerWithMail(m);
            if(player) {
                listeAttente += "<tr><td>" + player.name + "</td></tr>";
            }
        });
    }

    var listePasDispo = "";
    if (parametersMap.get("notAvailablePlayerMailList")) {
        playersNotAvailablePlayerListMail().forEach(function (m) {
            var player = getPlayerWithMail(m);
            if(player) {
                listePasDispo += "<tr><td>" + player.name + "</td></tr>";
            }
        });
    }

    var listePasRepondu = "";
    if (parametersMap.get("notRespondedPlayerMailList")) {
        playersNotRespondedPlayerListMail().forEach(function (m) {
            var player = getPlayerWithMail(m);
            if(player) {
                listePasRepondu += "<tr><td>" + player.name + "</td></tr>";
            }
        });
    }

    var tabTitle = "PadelLeague";

    return render("front/page/compo", tabTitle, {
        date: matchDayGapInFrench(true),
        compo: players,
        listeAttente: listeAttente,
        listePasDispo: listePasDispo,
        listePasRepondu: listePasRepondu
    });
}

