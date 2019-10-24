function playersTeamList() {
    return sheetTeam.getRange(2, 1, sheetTeam.getLastRow()-1, sheetTeam.getLastColumn()).getValues()
}

function shouldReceiveInscriptionMail(player, prior) {
    if (player.mail && player.prio <= prior && !player.haveResponded) {
        return true;
    }
}

function getPlayerWithMail(mail) {
    var teamList = playersTeamList();
    for (var i = 0; i < teamList.length; i++) {
        if (teamList[i][0] == mail) {
            var playerLine = sheetTeam.getRange(i + 2, 1, 1, sheetTeam.getLastColumn()).getValues()[0];
            return initPlayer(playerLine);
        }
    }
    throw "mail " + mail + " inconnu";
}

function initPlayer(playerLine) {
    Logger.log("initPlayer : " + playerLine);
    return {
        mail: playerLine[0],
        name: playerLine[1],
        prio: playerLine[2],
        haveResponded: playerLine[3]
    };
}

function getNewPlayerInCompo() {
    var mail = playersInWaitingListMail()[0];
    return getPlayerWithMail(mail);
}

function playersInTheMatchMail() {
    if(numberPlayerInMatch>0) {
        return matchPlayerMailList.split(',');
    }
    return [];
}

function playersInWaitingListMail() {
    if(numberPlayerInWaitingList>0) {
        return waitingListPlayerMailList.split(',');
    }
    return [];
}

function playersNotAvailablePlayerListMail() {
    if(notAvailablePlayerMailList) {
        return notAvailablePlayerMailList.split(',');
    }
    return [];
}

function playersNotRespondedPlayerListMail() {
    if(notRespondedPlayerMailList) {
        return notRespondedPlayerMailList.split(',');
    }
    return [];
}