function sendConfirmMail() {
    if (rangeCancelMatch.isBlank() && rangeConfirmation.isBlank()) {

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
        nbAvailableSlots: nbAvailableSlots,
        stadium: getStadiumInfo(),
        urlMail: getUrlMail(player),
        isNewPlayer: isNewPlayer,
        compo: getCompoPlayersListForMail(),
        playersInTheMatchMails: playersInTheMatchMails,
        subjectMailContact: encodeURIComponent(applicationName + " Conversation du match du" + nextMatchDayFrench)
    });
    sendMail(player.mail, "Confirmation de présence au match de Footsal " + matchDayGapInFrench(true) + " ✅", body);
}

function loadPageConfirmation() {
    if (param.answer == "Oui") {
        return render("front/html/confirmation", "confirmation",{mail: param.mail, key: param.key, admin: param.isAdmin});
    } else {
        return render("front/html/desinscription", "desinscription",{mail: param.mail, key: param.key, admin: param.isAdmin});
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