// noinspection JSUnusedGlobalSymbols
function execBatch() {
    var nextStep = getNextStep();
    Logger.log("nextStep "+ nextStep);
    if(isTimeForStep(nextStep)){
        Logger.log("isTimeForStep "+ nextStep);
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
    } else if(isParameterBlank("controlDone")){
        return 4;
    } else if(isParameterBlank("mailSendingReminder")){
        return 5;
    } else if(isParameterBlank("mailSendingConfirmation")){
        return 6;
    } else if(isParameterBlank("teamSaved")){
        return 7;
    } else {
      return 8;
    }
}

function isTimeForStep(step) {
    var nextMatchDay = parametersMap.get("nextMatchDate").getDay();
    var column = nextMatchDay + 1;
    var row = step + 4;
    var nextStepDate = sheetSchedule.getRange(row, column).getValue();
    var nextStepDay = nextStepDate.substring(0, 3);
    var nextStepHour = nextStepDate.substring(4, 9);
    var currentDay = Utilities.formatDate(new Date(), "Europe/Paris", "E");
    var currentHour = Utilities.formatDate(new Date(), "Europe/Paris", "HH");
    Logger.log("currentDay " + currentDay + "/ nextStepDay " + nextStepDay);
    if(currentDay == nextStepDay) {
        Logger.log("currentHour " + currentHour + "/ nextStepHour " + nextStepHour);
        if(currentHour >= nextStepHour) {
            return true;
        }
    }
    return false;
}

function execStep(step) {
    Logger.log("execStep "+ nextStep);
    switch (step) {
        case 1:
            deleteUnavaibility();
            sendInscriptionMailForAPrio(1);
            break;
        case 2:
            createEventIfMatchIsFull();
            sendInscriptionMailForAPrio(2);
            break;
        case 3:
            createEventIfMatchIsFull();
            sendInscriptionMailForAPrio(3);
            break;
        case 4:
            createEventIfMatchIsFull();
            controlAndCancelOrRelaunch();
            break;
        case 5:
            createEventIfMatchIsFull();
            sendReminderMail();
            break;
        case 6:
            createEventIfMatchIsFull();
            sendConfirmMail();
            break;
        case 7:
            saveTeam();
            break;
        case 8:
            sendScoreMail();
            updatePriority();
            setNextMatchDate();
            cleaning();
            break;
    }
}

// noinspection JSUnusedGlobalSymbols
function resultatDuMois() {
    sendLastMonthResultMail();
}


