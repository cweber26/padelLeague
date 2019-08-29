////////////LOG////////////
function logRunDate(type) {
    switch (type) {
        case 1:
            rangeSending1.setValue(new Date(Date.now()));
            break;
        case 2:
            rangeSending2.setValue(new Date(Date.now()));
            break;
        case 3:
            rangeSending3.setValue(new Date(Date.now()));
            break;
        case "reminder":
            rangeReminder.setValue(new Date(Date.now()));
            break;
        case "control":
            rangeControl.setValue(new Date(Date.now()));
            break;
        case "confirmation":
            rangeConfirmation.setValue(new Date(Date.now()));
            break;
        case "googleEvent":
            rangeGoogleEvent.setValue(new Date(Date.now()));
            break;
    }
}