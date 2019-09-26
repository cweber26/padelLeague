var currentWeekDay = parseInt(Utilities.formatDate(new Date(), "Europe/Paris", "u"));
var nextMatchDate = parametersMap.get("nextMatchDate");
var nextMatchDay = nextMatchDate.getDay();
var scheduleValues = sheetSchedule.getRange(1, 1).getDataRegion().getValues();

function setNextMatchDate() {
    //lundi = 1 , dimanche = 7
    for (var i = 1; i <= 7; i++) {
        var dayToTest = (currentWeekDay+i);
        if(isADayWithMatch(dayToTest)){
            updateParameterValue("nextMatchDate", nextDay(dayToTest));
            return;
        }
    }
}

function isADayWithMatch(dayNumber) {
    if (dayNumber > 7) {
        dayNumber -= 7;
    }
    return (scheduleValues[1][dayNumber]);
}

function nextDay(weekDay) {
    var cptDay;
    if (currentWeekDay < weekDay) {
        cptDay = weekDay - currentWeekDay;
    } else if (currentWeekDay == weekDay) {
        cptDay = 7;
    } else {
        cptDay = (7 - (currentWeekDay - weekDay));
    }
    return Utilities.formatDate(new Date(Date.now() + ((cptDay * 1000) * 60 * 60 * 24)), "GMT", "MM/dd/yy");
}

function haveSelectedMatchDay(player, nextMatchDay) {
    switch (nextMatchDay) {
        case 1:
            return player.mondaySelected == true;
        case 2:
            return player.tuesdaySelected == true;
        case 3:
            return player.wednesdaySelected == true;
        case 4:
            return player.thursdaySelected == true;
        case 5:
            return player.fridaySelected == true;
        default:
            return false;
    }
}

function matchDayGapInFrench(withPronom) {
    var daysDiff = parseInt((getDateAt000000(nextMatchDate)-getDateAt000000(new Date()))/ (1000*60*60*24));
    switch (daysDiff) {
        case 0:
            if (withPronom) {
                return "de ce midi";
            } else {
                return "midi";
            }
        case 1:
            if (withPronom) {
                return "de demain";
            } else {
                return "demain";
            }
        default:
            if (withPronom) {
                return "du " + parametersMap.get("nextMatchDateFrench");
            } else {
                return parametersMap.get("nextMatchDateFrench");
            }
    }
}

function getDateFormat(date) {
    if (date != "") {
        return Utilities.formatDate(new Date(date), "Europe/Paris", "dd/MM/yy");
    } else {
        return "";
    }
}

function getDateTimeFormat(date) {
    if (date != "") {
        return Utilities.formatDate(new Date(date), "Europe/Paris", "dd/MM/yy HH:mm:ss");
    } else {
        return "";
    }
}

function getDateAt000000(date) {
    if (date != "") {
        return new Date(Utilities.formatDate(new Date(date), "Europe/Paris", "MM/dd/yyyy"));
    } else {
        return "";
    }
}

function now() {
    return new Date(Date.now());
}