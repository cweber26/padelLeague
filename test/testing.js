// noinspection JSUnusedGlobalSymbols
function testMails() {
    var player = getPlayerWithMail("cedric.weber@decathlon.com");
    sendInscriptionMailForAPlayer(player);
    sendRemindMailForAPlayer(player);
    sendMatchCompletMailForAPlayer(player);
}