// noinspection JSUnusedGlobalSymbols
function initialisationMatch() {
    updatePriority();
    cleaning();
    setNextMatchDate();
    deleteUnavaibility();
    envoiInscriptionGroup1();
}

function envoiInscriptionGroup1() {
    sendInscriptionMailForAPrio(1);
}

// noinspection JSUnusedGlobalSymbols
function envoiInscriptionGroup2() {
    sendInscriptionMailForAPrio(2);
}

// noinspection JSUnusedGlobalSymbols
function envoiInscriptionGroup3() {
    sendInscriptionMailForAPrio(3);
}

// noinspection JSUnusedGlobalSymbols
function autoAnnulation() {
    controlAndCancelOrRelaunch();
}

// noinspection JSUnusedGlobalSymbols
function rappelMatch() {
    sendReminderMail();
}

// noinspection JSUnusedGlobalSymbols
function confirmationMatch() {
    sendConfirmMail();
}

// noinspection JSUnusedGlobalSymbols
function resultatDuMois() {
    sendLastMonthResultMail();
}


