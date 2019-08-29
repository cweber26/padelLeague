// noinspection JSUnusedGlobalSymbols
function testInscription15() {
    var playersList = playersTeamList();
    for (var i = 0; i < 15; i++) {
        var player = initPlayer(playersList[i]);
        inscription({mail: player.mail, key: player.keyWithSecurity, answer: "Oui"});
    }
}

// noinspection JSUnusedGlobalSymbols
function testInscription5() {
    var playersList = playersTeamList();
    for (var i = 0; i < 5; i++) {
        var player = initPlayer(playersList[i]);
        inscription({mail: player.mail, key: player.keyWithSecurity, answer: "Oui"});
    }
}

// noinspection JSUnusedGlobalSymbols
function testConfirmation() {
    var playersList = playersTeamList();
    for (var i = 0; i < 15; i++) {
        var player = initPlayer(playersList[i]);
        confirmation({mail: player.mail, key: player.keyWithSecurity, answer: "Oui"});
    }
}

// noinspection JSUnusedGlobalSymbols
function testMails() {
    var player = getPlayerWithMail("cedric.weber@decathlon.com");
    sendInscriptionMail(player);
    sendRemindMailForAPlayer(player, true);
    sendRemindMailForAPlayer(player, false);
    sendConfirmMailForAPlayer(player, true);
    sendConfirmMailForAPlayer(player, false);
    sendWaitingListMail(player);
    sendMailCancelMatchForAPlayer(player, true);
    sendMailCancelMatchForAPlayer(player, false);
    sendMailMatchCompletForAPlayer(player);
}

function test() {
    var player = getPlayerWithMail("cedric.weber@decathlon.com");
    sendMailMatchCompletForAPlayer(player);
}
