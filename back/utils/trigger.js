
function execBatch() {
    var nextStep = getNextStep();
    if(isTimeForStep(nextStep)){
        execStep(nextStep);
    }
}

function getNextStep() {
    if(isParameterBlank("mailSendingPrio1")){
        return 1;
    } else if(isParameterBlank("mailSendingPrio2")){
        return 2;
    } else if(isParameterBlank("mailSendingPrio3")){
        return 3;
    } else if(isParameterBlank("mailSendingReminder")){
        return 4;
    } else if(isParameterBlank("mailSendingPrio1")){
        return 5;
    } else if(isParameterBlank("controlDone")){
        return 6;
    } else if(isParameterBlank("mailSendingConfirmation")){
        return 7;
    } else if(isParameterBlank("scoreSaved")){
        return 8;
    } else {
      return 9;
    }
}

function isTimeForStep(step) {
    var row = step + 4;
    var column = currentWeekDay + 1;
    var rangeStepHour = sheetSchedule.getRange(row, column);
    if (!rangeStepHour.isBlank()) {
        var hourStep = Utilities.formatDate(rangeStepHour.getValue(), "Europe/Paris", "HH:mm");
        var currentHourTime = Utilities.formatDate(new Date(), "Europe/Paris", "HH:mm");
        if (currentHourTime >= hourStep) {
            return true;
        }
    }
    return false;
}

function execStep(step) {
    switch (step) {
        case 1:
            deleteUnavaibility();
            sendInscriptionMailForAPrio(1);
            break;
        case 2:
            sendInscriptionMailForAPrio(2);
            break;
        case 3:
            sendInscriptionMailForAPrio(3);
            break;
        case 4:
            controlAndCancelOrRelaunch();
            break;
        case 5:
            sendReminderMail();
            break;
        case 6:
            sendConfirmMail();
            break;
        case 7:
            //TODO enregistrer la date de match de match et l'équipe
            break;
        case 8:
            updatePriority();
            setNextMatchDate();
            cleaning();
            break;
    }
}

// noinspection JSUnusedGlobalSymbols
function initialisationMatch() {
    updatePriority();
    cleaning();
    setNextMatchDate();
    deleteUnavaibility();
    envoiInscriptionGroup1();
}

// noinspection JSUnusedGlobalSymbols
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


