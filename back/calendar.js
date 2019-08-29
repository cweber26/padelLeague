function createCalendarEvent() {
    if (rangeGoogleEvent.isBlank()) {
        var calendar = CalendarApp.getDefaultCalendar();
        var begin = new Date(Utilities.formatDate(nextMatchDate, "Europe/Paris", "MM/dd/yyyy") + " 12:00:00");
        var end = new Date(Utilities.formatDate(nextMatchDate, "Europe/Paris", "MM/dd/yyyy") + " 14:00:00");
        var mails = playersInTheMatchMails;
        if (modeTest) {
            mails = mailTester;
        }
        calendar.createEvent(applicationName, begin, end, {location: address, guests: mails, sendInvites: false});
        logRunDate("googleEvent");
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
    rangeGoogleEvent.clearContent();
}