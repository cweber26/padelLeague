function createEventIfMatchIsFull() {
    if (creationGoogleEvent=="" && numberPlayerInMatch == numberPlayerMatch) {
        sendMatchCompletMail();
        createCalendarEvent();
    }
}

function updateCalendarEvent(newMail, oldMail) {
    if(creationGoogleEvent!=""){
        var event = getCalendarEvent();
        if(event) {
            event.removeGuest(oldMail);
            event.addGuest(newMail);
        }
        updateParameter("creationGoogleEvent", now());
    }
}

function getCalendarEvent() {
    var calendar = CalendarApp.getDefaultCalendar();
    var begin = new Date(Utilities.formatDate(nextMatchDate, "Europe/Paris", "MM/dd/yyyy") + " 12:00:00");
    var end = new Date(Utilities.formatDate(nextMatchDate, "Europe/Paris", "MM/dd/yyyy") + " 14:00:00");
    var events = calendar.getEvents(begin, end);
    for (var i in events) {
        if (events[i].getTitle() == applicationName) {
            return events[i];
        }
    }
}

function createCalendarEvent() {
    if (creationGoogleEvent=="") {
        var calendar = CalendarApp.getDefaultCalendar();
        var begin = new Date(Utilities.formatDate(nextMatchDate, "Europe/Paris", "MM/dd/yyyy") + " 12:00:00");
        var end = new Date(Utilities.formatDate(nextMatchDate, "Europe/Paris", "MM/dd/yyyy") + " 14:00:00");
        var mails = matchPlayerMailList;
        if (modeTest) {
            mails = mailTester;
        }
        var event = calendar.createEvent(applicationName, begin, end, {location: "87 Rue Gustave Delory, 59810 Lesquin", guests: mails, sendInvites: false});

        if(mails.includes("cedric.weber@decathlon.com")){
            event.setMyStatus(CalendarApp.GuestStatus.YES);
        }
        updateParameter("creationGoogleEvent", now());
    }
}