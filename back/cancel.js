function cancelMatchAndSendMail(isAutoCancel) {
    updateParameterValue("isMatchCancel", true);
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
        nbLimitPlayers: parametersMap.get("minPlayerForAutoCancelation"),
        isAutoCancel: isAutoCancel,
        urlMail: getUrlMail(player)
    });
    sendMail(player.mail, "⛔ Annulation du match de Footsal " + matchDayGapInFrench(true) + " ⛔😢", body);
}

function isMatchCancel() {
    return isParameterTrue("isMatchCancel");
}