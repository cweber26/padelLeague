function isAuthorized(player, prior) {
    if (player.mail
        && player.prioValue <= prior
        && player.haveAlreadyAnswer == false
        && player.isUnavailable == false
        && haveSelectedMatchDay(player, nextMatchDay)) {
        return true;
    }
}


function getPlayerWithMail(mail) {
    var teamList = playersTeamList();
    for (var i = 0; i < teamList.length; i++) {
        if (teamList[i][0] == mail) {
            var p = sheetTeam.getRange(i + 3, 1, 1, sheetTeam.getLastColumn()).getValues()[0];
            return initPlayer(p);
        }
    }
}

function initPlayer(p) {
    return {
        mail: p[0],
        key: p[1],
        keyWithSecurity: (p[1] * 2 + 10),
        firstName: p[2],
        lastName: p[3],
        fullName: p[4],
        shortfullName: p[5],
        nickName: p[6],
        isUnavailable: p[7],
        endDateOfUnavailibility: p[8],
        mondaySelected: p[9],
        tuesdaySelected: p[10],
        wednesdaySelected: p[11],
        thursdaySelected: p[12],
        fridaySelected: p[13],
        site: p[14],
        position: p[15],
        levelDribble: p[16],
        levelFrappe: p[17],
        levelDefense: p[18],
        haveDoneAutoEvaluation: p[19],
        haveAlreadyAnswer: p[20],
        prioValue: p[21],
        isAdmin: p[22],
        isPrioritary: p[23]
    };
}

function isValidUser(param) {
    var player = getPlayerWithMail(param.mail);
    if (player) {
        if (isKeyValid(param.key, player.key)) {
            if (player.isAdmin) {
                param.isAdmin = true;
            }
            return true;
        }
    }
    return false;
}


function deleteUnavaibility() {
    var playersList = playersTeamList();
    for (var i in playersList) {
        var player = playersList[i];
        if (player.endDateOfUnavailibility) {
            if (player.endDateOfUnavailibility.valueOf() < nextMatchDate.valueOf()) {
                sheetTeam.getRange(Number(i) + 3, 8).setValue(false);
                sheetTeam.getRange(Number(i) + 3, 9).clearContent();
            }
        }
    }
}


function getNewPlayerInCompo() {
    var mail = playersInTheMatchMail()[9];
    return getPlayerWithMail(mail);
}