function sendConfirmMail() {
    if (!isMatchCancel() && isParameterBlank("mailSendingConfirmation")) {

        var mails = playersInTheMatchMail();
        for (var i in mails) {
            var player = getPlayerWithMail(mails[i]);
            sendConfirmMailForAPlayer(player, false);
        }
        logRunDate("confirmation");
    }
}

function sendConfirmMailForAPlayer(player, isNewPlayer) {
    var body = includeWithArgs("front/mail/mailConfirmation", {
        date: matchDayGapInFrench(true),
        nbAvailableSlots: parametersMap.get("numberAvailableSlotInMatch"),
        stadium: getStadiumInfo(),
        urlMail: getUrlMail(player),
        isNewPlayer: isNewPlayer,
        compo: getCompoPlayersListForMail(),
        playersInTheMatchMails: parametersMap.get("matchPlayerMailList"),
        subjectMailContact: encodeURIComponent(parametersMap.get("applicationName") + " Conversation du match du" + parametersMap.get("nextMatchDateFrench"))
    });
    sendMail(player.mail, "Confirmation de présence au match de Footsal " + matchDayGapInFrench(true) + " ✅", body);
}

function loadPageConfirmation() {
    if (param.answer == "Oui") {
        return render("front/page/confirmation", "confirmation",{mail: param.mail, key: param.key, admin: param.isAdmin});
    } else {
        return render("front/page/desinscription", "desinscription",{mail: param.mail, key: param.key, admin: param.isAdmin});
    }
}



function confirmation(parameter) {
    var inscriptions = sheetInscription.getRange(2, 1, sheetInscription.getLastRow(), sheetInscription.getLastColumn()).getValues();
    for (var i in inscriptions) {
        var inscription = inscriptions[i];
        if (inscription[1] == parameter.mail && (inscription[2] == parameter.key || parameter.key == "666")) {
            var row = Number(i) + 2;
            sheetInscription.getRange(row, 5).setValue(new Date(Date.now()));
            sheetInscription.getRange(row, 6).setValue(parameter.answer);
            sheetInscription.getRange(row, 4).setValue(parameter.answer);
            if (parameter.answer == "Non") {
                actionsToDoIfDesistement();
            }
            return;
        }
    }
}