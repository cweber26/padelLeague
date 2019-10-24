function createEventIfMatchIsFull() {
    if (creationGoogleEvent="" && numberPlayerInMatch == numberPlayerMatch) {
        sendMatchCompletMail();
        createCalendarEvent();
    }
}

function updateCalendarEvent() {
    if(creationGoogleEvent!=""){
        deleteCalendarEvent();
        createCalendarEvent();
    }
}

function createCalendarEvent() {
    if (creationGoogleEvent="") {
        var calendar = CalendarApp.getDefaultCalendar();
        var begin = new Date(Utilities.formatDate(nextMatchDate, "Europe/Paris", "MM/dd/yyyy") + " 12:00:00");
        var end = new Date(Utilities.formatDate(nextMatchDate, "Europe/Paris", "MM/dd/yyyy") + " 14:00:00");
        var mails = matchPlayerMailList;
        if (modeTest) {
            mails = mailTester;
        }
        calendar.createEvent(applicationName, begin, end, {location: "87 Rue Gustave Delory, 59810 Lesquin", guests: mails, sendInvites: false});
        updateParameter("creationGoogleEvent", now());
    }
}

function deleteCalendarEvent() {
    var calendar = CalendarApp.getDefaultCalendar();
    var begin = new Date(Utilities.formatDate(nextMatchDate, "Europe/Paris", "MM/dd/yyyy") + " 12:00:00");
    var end = new Date(Utilities.formatDate(nextMatchDate, "Europe/Paris", "MM/dd/yyyy") + " 14:00:00");
    var events = calendar.getEvents(begin, end);
    for (var i in events) {
        if (events[i].getTitle() == applicationName) {
            events[i].deleteEvent();
        }
    }
    clearParameter("creationGoogleEvent");
}