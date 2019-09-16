function sendInscriptionMailForAPrio(prio) {
    if (!isMatchCancel() && parametersMap.get("numberAvailableSlotInMatch") > 0) {
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
        nbAvailableSlots: parametersMap.get("numberAvailableSlotInMatch"),
        urlMail: getUrlMail(player),
        stadium: getStadiumInfo(),
        evalToDo: !player.haveDoneAutoEvaluation
    });
    sendMail(player.mail, "Inscription au match de Footsal du " + parametersMap.get("nextMatchDateFrench") + " ✅", body);
}




function loadPageInscription() {
    if (param.answer == "Oui") {
        return render("front/page/inscription", "inscription", {mail: param.mail, key: param.key, admin: param.isAdmin});
    } else {
        return render("front/page/desinscription", "desinscription",{mail: param.mail, key: param.key, admin: param.isAdmin});
    }
}



function inscription(parameter) {
    if (isValidAnswer(parameter)) {
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
        sheetInscription.getRange(row, 3).setValue(parameter.key); //TODO supprimer la clef dans la page d'inscription / le check fait de base au chargement des pages est suffisant / ne pas oublié de changer la modification de la clef dans la page de modification du profil si mail modifié
        sheetInscription.getRange(row, 4).setValue(parameter.answer);

        if (parametersMap.get("numberPlayerInMatch") == (parametersMap.get("numberPlayerMatch") - 1) && parameter.answer == "Oui") {
            sendMatchCompletMail();
            createCalendarEvent();
        }

    }
}


function isValidAnswer(parameter) {
    if (parameter.answer != "Oui" && parameter.answer != "Non") {
        throw "La réponse ne peut être que Oui ou Non";
    }
    return true;
}
