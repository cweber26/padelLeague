function loadPageCompo() {
    var players = [];
    if (numberPlayerInMatch > 0) {
        playersInTheMatchMail().forEach(function (m) {
            var player = getPlayerWithMail(m);
            players.push(player.name);
        });
    }

    var listeAttente = "";
    if (numberPlayerInWaitingList > 0) {
        playersInWaitingListMail().forEach(function (m) {
            var player = getPlayerWithMail(m);
            if(player) {
                listeAttente += "<tr><td>" + player.name + "</td></tr>";
            }
        });
    }

    var listePasDispo = "";
    if (notAvailablePlayerMailList) {
        playersNotAvailablePlayerListMail().forEach(function (m) {
            var player = getPlayerWithMail(m);
            if(player) {
                listePasDispo += "<tr><td>" + player.name + "</td></tr>";
            }
        });
    }

    var listePasRepondu = "";
    if (notRespondedPlayerMailList) {
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
        listePasRepondu: listePasRepondu,
        nbTerrain: numberOfField
    });
}

