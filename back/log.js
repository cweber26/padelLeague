////////////LOG////////////
function logRunDate(type) {
    switch (type) {
        case 1:
            rangeSending1.setValue(now);
            break;
        case 2:
            rangeSending2.setValue(now);
            break;
        case 3:
            rangeSending3.setValue(now);
            break;
        case "reminder":
            rangeReminder.setValue(now);
            break;
        case "control":
            rangeControl.setValue(now);
            break;
        case "confirmation":
            rangeConfirmation.setValue(now);
            break;
        case "googleEvent":
            rangeGoogleEvent.setValue(now);
            break;
    }
}