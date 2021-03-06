// noinspection JSUnusedGlobalSymbols
function execBatch() {
    var nextStep = getNextStep();
    Logger.log("nextStep "+ nextStep);
    if(isTimeForStep(nextStep)){
        execStep(nextStep);
    }
    createEventIfMatchIsFull();
}

function getNextStep() {
    if(mail1==""){
        return 1;
    } else if(mail2==""){
        return 2;
    } else if(mailReminder==""){
        return 3;
    } else if(cleaning==""){
      return 4;
    }
}

function isTimeForStep(step) {
    var nextMatchDay = nextMatchDate.getDay();
    var column = nextMatchDay + 1;
    var row = step + 2;
    var nextStepDate = sheetSchedule.getRange(row, column).getValue();
    var nextStepDay = nextStepDate.substring(0, 3);
    var nextStepHour = nextStepDate.substring(4, 9);
    var currentDay = Utilities.formatDate(new Date(), "Europe/Paris", "E");
    var currentHour = Utilities.formatDate(new Date(), "Europe/Paris", "HH:mm");
    Logger.log("currentDay " + currentDay + " / nextStepDay " + nextStepDay);
    if(currentDay == nextStepDay) {
        Logger.log("same day for the next step");
        Logger.log("currentHour " + currentHour + " / nextStepHour " + nextStepHour);
        if(currentHour >= nextStepHour) {
            Logger.log("after or equal time (hour) for the next step");
            return true;
        }
    }
    return false;
}

function execStep(step) {
    Logger.log("execStep "+ step);
    switch (step) {
        case 1:
            sendInscriptionMailForAPrio(1);
            break;
        case 2:
            sendInscriptionMailForAPrio(2);
            break;
        case 3:
            sendReminderMail();
            break;
        case 4:
            cleaningParam();
            setNextMatchDate();
    }
}


