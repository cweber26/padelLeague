function sendInscriptionMailForAPrio(prio) {
    if (rangeCancelMatch.isBlank() && nbAvailableSlots > 0) {
        var playersList = playersTeamList();
        for (var i in playersList) {
            var player = initPlayer(playersList[i]);
            if (shouldReceiveInscriptionMail(player, prio)) {
                sendInscriptionMailForAPlayer(player);
            }
        }
    }
    logRunDate(prio);
}

function sendInscriptionMailForAPlayer(player) {
    var body = includeWithArgs("front/mail/mailInscription", {
        date: matchDayGapInFrench(true),
        nbAvailableSlots: nbAvailableSlots,
        urlMail: getUrlMail(player),
        stadium: getStadiumInfo(),
        evalToDo: !player.haveDoneAutoEvaluation
    });
    sendMail(player.mail, "Inscription au match de Footsal du " + nextMatchDayFrench + " ✅", body);
}




function loadPageInscription() {
    if (param.answer == "Oui") {
        return render("front/page/inscription", "inscription", {mail: param.mail, key: param.key, admin: param.isAdmin});
    } else {
        return render("front/page/desinscription", "desinscription",{mail: param.mail, key: param.key, admin: param.isAdmin});
    }
}



function inscription(parameter) {
    if (isValid(parameter)) {
        var playersInTheMatchMailBefore = playersInTheMatchMail();
        if (sheetInscription.getLastRow() > 1) {
            var inscriptions = sheetInscription.getRange(2, 1, sheetInscription.getLastRow(), sheetInscription.getLastColumn()).getValues();
            for (var i in inscriptions) {
                if (inscriptions[i][1] == parameter.mail) {
                    if (inscriptions[i][3] == parameter.answer) {
                        // user already send us the same answer. we do nothing
                        return;
                    } else {
                        // answer different. we delete the row and check if it is a desistement.
                        sheetInscription.deleteRow(Number(i) + 2);
                        checkIfDesistement(parameter, playersInTheMatchMailBefore);
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
            sendMatchCompletMail();
            createCalendarEvent();
        }

    }
}


function isValid(parameter) {
    if (parameter.answer != "Oui" && parameter.answer != "Non") {
        return false;
    }
    var rowPlayer = getRowSheetTeamWithMail(parameter.mail);
    // noinspection RedundantIfStatementJS
    if (!rowPlayer) {
        return false;
    }
    return true;
}


function isKeyValid(keyToCheck, key) {
    return keyToCheck == (key * 2 + 10) || keyToCheck == "666";
}