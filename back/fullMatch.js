function sendMatchCompletMail() {
    if (rangeCancelMatch.isBlank()) {
        var mails = mailsAdmin.split(',');
        for (var i in mails) {
            var player = getPlayerWithMail(mails[i]);
            sendMatchCompletMailForAPlayer(player);
        }
    }
}

function sendMatchCompletMailForAPlayer(player) {
    sendMail(player.mail, "Match du " + nextMatchDayFrench + " complet 🤙🤙", includeWithArgs("front/mail/mailMatchComplet", {
        date: matchDayGapInFrench(true),
        compo: getCompoPlayersListForMail(),
        urlMail: getUrlMail(player)
    }));
}