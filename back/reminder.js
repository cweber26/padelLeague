function sendReminderMail() {
    if (isParameterBlank("mailReminder") && parametersMap.get("numberPlayerInMatch")==parametersMap.get("numberPlayerMatch") ) {
        sendReminderMailWithoutControl();
        updateParameterValue("mailReminder", now());
    }
}

function sendReminderMailWithoutControl() {
    var matchMails = playersInTheMatchMail();
    for (var i in matchMails) {
        sendRemindMailForAPlayer(getPlayerWithMail(matchMails[i]), false);
    }
}

function sendRemindMailForAPlayer(player) {
    sendMail(player.mail, "Rappel : Match de padel " + matchDayGapInFrench(false) + " 🤙🤙", getBodyMailReminder(player));
}

function getBodyMailReminder() {
    return includeWithArgs("front/mail/mailReminder", {
        date: matchDayGapInFrench(true),
        nbAvailableSlots: parametersMap.get("numberAvailableSlotInMatch"),
        compo: getCompoPlayersListForMail()
    });
}

function getCompoPlayersListForMail() {
    var players = [];
    if (parametersMap.get("numberPlayerInMatch") > 0) {
        playersInTheMatchMail().forEach(function (m) {
            var player = getPlayerWithMail(m)
            players.push(player.name);
        });
    }
    return players;
}