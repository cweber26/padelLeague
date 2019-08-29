function sendCancelMatchMail(isAutoCancel) {
    var playerMails = playersInTheMatchMail();
    for (var i in playerMails) {
        var player = getPlayerWithMail(playerMails[i]);
        sendCancelMatchMailForAPlayer(player, isAutoCancel);
    }
}


function sendCancelMatchMailForAPlayer(player, isAutoCancel) {
    var body = includeWithArgs("front/mail/mailCancelMatch", {
        date: matchDayGapInFrench(true),
        player: player,
        nbLimitPlayers: nbLimitPlayers,
        isAutoCancel: isAutoCancel,
        urlMail: getUrlMail(player)
    });
    sendMail(player.mail, "⛔ Annulation du match de Footsal " + matchDayGapInFrench(true) + " ⛔😢", body);
}