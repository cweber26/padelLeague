function createEventIfMatchIsFull() {
    if (isParameterBlank("creationGoogleEvent") && parametersMap.get("numberPlayerInMatch") == parametersMap.get("numberPlayerMatch")) {
        sendMatchCompletMail();
        createCalendarEvent();
    }
}

function updateCalendarEvent() {
    if(isParameterNotBlank("creationGoogleEvent")){
        deleteCalendarEvent();
        createCalendarEvent();
    }
}

function createCalendarEvent() {
    if (isParameterBlank("creationGoogleEvent")) {
        var calendar = CalendarApp.getDefaultCalendar();
        var begin = new Date(Utilities.formatDate(nextMatchDate, "Europe/Paris", "MM/dd/yyyy") + " 12:00:00");
        var end = new Date(Utilities.formatDate(nextMatchDate, "Europe/Paris", "MM/dd/yyyy") + " 14:00:00");
        var mails = parametersMap.get("matchPlayerMailList");
        if (parametersMap.get("modeTest")) {
            mails = parametersMap.get("mailTester");
        }
        calendar.createEvent(parametersMap.get("applicationName"), begin, end, {location: "87 Rue Gustave Delory, 59810 Lesquin", guests: mails, sendInvites: false});
        updateParameterValue("creationGoogleEvent", now());
    }
}

function deleteCalendarEvent() {
    var calendar = CalendarApp.getDefaultCalendar();
    var begin = new Date(Utilities.formatDate(nextMatchDate, "Europe/Paris", "MM/dd/yyyy") + " 12:00:00");
    var end = new Date(Utilities.formatDate(nextMatchDate, "Europe/Paris", "MM/dd/yyyy") + " 14:00:00");
    var events = calendar.getEvents(begin, end);
    for (var i in events) {
        if (events[i].getTitle() == parametersMap.get("applicationName")) {
            events[i].deleteEvent();
        }
    }
    clearParameterValue("creationGoogleEvent");
}