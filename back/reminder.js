function sendReminderMail() {
    if (isParameterBlank("mailReminder")) {
        if(!isMatchCancel()){
            sendReminderMailWithoutControl();
        }
        updateParameterValue("mailReminder", now());
    }
}

function sendReminderMailWithoutControl() {
    var matchMails = playersInTheMatchMail();
    for (var i in matchMails) {
        sendRemindMailForAPlayer(getPlayerWithMail(matchMails[i]), false);
    }

    if (parametersMap.get("numberPlayerInWaitingList") > 0) {
        var waitingListMails = playersInWaitingListMail();
        for (var j in waitingListMails) {
            sendWaitingListMail(getPlayerWithMail(waitingListMails[j]));
        }
    }
}

function sendWaitingListMail(player) {
    var body = includeWithArgs("front/mail/mailWaitingList", {
        date: matchDayGapInFrench(true),
    });
    sendMail(player.mail, "Liste d'attente pour le match " + matchDayGapInFrench(true), body);
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