function sendMailMatchComplet() {
    if (rangeCancelMatch.isBlank()) {
        var mails = mailsAdmin.split(',');
        for (var i in mails) {
            var player = getPlayerWithMail(mails[i]);
            sendMailMatchCompletForAPlayer(player);
        }
    }
}

function sendMailMatchCompletForAPlayer(player) {
    sendMail(player.mail, "Match complet 🤙🤙 " + matchDayGapInFrench(false), includeWithArgs("front/mail/mailMatchComplet", {
        date: matchDayGapInFrench(true),
        compo: getCompoPlayersListForMail(),
        urlMail: getUrlMail(player)
    }));
}