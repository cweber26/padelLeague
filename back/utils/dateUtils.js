function setNextMatchDate() {
    switch (currentWeekDay) {
        case 1:
            return rangeNextGameDate.setValue(nextDay(3));
        case 2:
            return rangeNextGameDate.setValue(nextDay(3));
        case 3:
            return rangeNextGameDate.setValue(nextDay(5));
        case 4:
            return rangeNextGameDate.setValue(nextDay(5));
        case 5:
            return rangeNextGameDate.setValue(nextDay(3));
        default:
            return rangeNextGameDate.setValue(nextDay(3));
    }
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
    switch (nextMatchDay - new Date().getDay()) {
        case -6:
            if (withPronom) {
                return "de demain";
            } else {
                return "demain";
            }
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
                return "du " + nextMatchDayFrench;
            } else {
                return nextMatchDayFrench;
            }
    }
}