////////////LOG////////////
function logRunDate(type) {
    switch (type) {
        case 1:
            updateParameterValue("mailSendingPrio1",new Date(Date.now()));
            break;
        case 2:
            updateParameterValue("mailSendingPrio2",new Date(Date.now()));
            break;
        case 3:
            updateParameterValue("mailSendingPrio3",new Date(Date.now()));
            break;
        case "reminder":
            updateParameterValue("mailSendingReminder",new Date(Date.now()));
            break;
        case "control":
            updateParameterValue("controlDone",new Date(Date.now()));
            break;
        case "confirmation":
            updateParameterValue("mailSendingConfirmation",new Date(Date.now()));
            break;
        case "googleEvent":
            updateParameterValue("creationGoogleEvent",new Date(Date.now()));
            break;
        case "scoreSaved":
            updateParameterValue("scoreSaved",new Date(Date.now()));
            break;
    }
}