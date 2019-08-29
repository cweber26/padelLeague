function updatePriority() {
    deleteOldPriority();
    saveNewPriority();
}

function deleteOldPriority() {
    if (nbPlayersAvailable > 0) {
        var mails = playersInTheMatchMail();
        for (var i in mails) {
            var row = getRowSheetTeamWithMail(mails[i]);
            sheetTeam.getRange(row, 24).setValue(false);
        }
    }
}

function saveNewPriority() {
    if (nbPlayersWaiting > 0) {
        var mails = playersInWaitingListMail();
        for (var i in mails) {
            var row = getRowSheetTeamWithMail(mails[i]);
            sheetTeam.getRange(row, 24).setValue(true);
        }
    }
}

function getRowSheetTeamWithMail(mail) {
    var teamList = playersTeamList();
    for (var i = 0; i < teamList.length; i++) {
        if (teamList[i][0] == mail) {
            return i + 3;
        }
    }
}