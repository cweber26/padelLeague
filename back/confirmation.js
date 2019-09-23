function sendConfirmMail() {
    if (!isMatchCancel() && isParameterBlank("mailSendingConfirmation")) {

        var mails = playersInTheMatchMail();
        for (var i in mails) {
            var player = getPlayerWithMail(mails[i]);
            sendConfirmMailForAPlayer(player, false);
        }
        updateParameterValue("mailSendingConfirmation", new Date(Date.now()));
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
    } else if (param.answer == "Non") {
        return render("front/page/desinscription", "desinscription",{mail: param.mail, key: param.key, admin: param.isAdmin});
    }
}



function confirmation(parameter) {
    Logger.log("Confirmation for " + parameter.mail + " and answer " + parameter.answer);
    var inscriptions = sheetInscription.getRange(2, 1, sheetInscription.getLastRow(), sheetInscription.getLastColumn()).getValues();
    for (var i in inscriptions) {
        var inscription = inscriptions[i];
        if (inscription[0] == parameter.mail) {
            var row = Number(i) + 2;
            sheetInscription.getRange(row, 3).setValue(parameter.answer);
            sheetInscription.getRange(row, 4).setValue(new Date(Date.now()));
            sheetInscription.getRange(row, 5).setValue(parameter.answer);
            if (parameter.answer == "Non") {
                actionsToDoIfDesistement();
            }
            return;
        }
    }
}