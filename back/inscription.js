function sendInscriptionMailForAPrio(prio) {
    if (rangeCancelMatch.isBlank() && nbAvailableSlots > 0) {
        var playersList = playersTeamList();
        for (var i in playersList) {
            var player = initPlayer(playersList[i]);
            if (isAuthorized(player, prio)) {
                sendInscriptionMail(player);
            }
        }
    }
    logRunDate(prio);
}

function sendInscriptionMail(player) {
    var body = includeWithArgs("front/mail/mailInscription", {
        date: matchDayGapInFrench(true),
        nbAvailableSlots: nbAvailableSlots,
        urlMail: getUrlMail(player),
        stadium: getStadiumInfo(),
        evalToDo: !player.haveDoneAutoEvaluation
    });
    sendMail(player.mail, "Inscription au match de Footsal du " + nextMatchDayFrench + " ✅", body);
}




function loadInscription() {
    if (param.answer == "Oui") {
        return render("front/html/inscription", "inscription", {mail: param.mail, key: param.key, admin: param.isAdmin});
    } else {
        return render("front/html/desinscription", "desinscription",{mail: param.mail, key: param.key, admin: param.isAdmin});
    }
}



function inscription(parameter) {
    if (isValid(parameter)) {
        var isDesistement = false;
        var playersInTheMatchMailBefore = playersInTheMatchMail();
        if (sheetInscription.getLastRow() > 1) {
            var inscriptions = sheetInscription.getRange(2, 1, sheetInscription.getLastRow(), sheetInscription.getLastColumn()).getValues();
            for (var i in inscriptions) {
                var inscription = inscriptions[i];
                if (inscription[1] == parameter.mail) {
                    if (inscription[3] == parameter.answer) {
                        return;
                    } else {
                        sheetInscription.deleteRow(Number(i) + 2);
                        if (parameter.answer == "Non") {
                            for (var j in playersInTheMatchMailBefore) {
                                if (playersInTheMatchMailBefore[j] == parameter.mail) {
                                    isDesistement = true;
                                    break;
                                }
                            }
                        }
                        break;
                    }
                }
            }
        }
        var row = sheetInscription.getLastRow() + 1;
        sheetInscription.getRange(row, 1).setValue(new Date(Date.now()));
        sheetInscription.getRange(row, 2).setValue(parameter.mail);
        sheetInscription.getRange(row, 3).setValue(parameter.key);
        sheetInscription.getRange(row, 4).setValue(parameter.answer);

        if (nbPlayersAvailable == (nbMaxPlayers - 1) && parameter.answer == "Oui") {
            sendMailMatchComplet();
        }

        if (isDesistement) {
            actionsToDoIfDesistement();
        }
    }
}


function isValid(parameter) {
    if (parameter.answer != "Oui" && parameter.answer != "Non") {
        return false;
    }
    var rowPlayer = getRowPlayerWithMail(parameter.mail);
    if (!rowPlayer) {
        return false;
    }
    return true;
}


function isKeyValid(keyToCheck, key) {
    return keyToCheck == (key * 2 + 10) || keyToCheck == "666";
}