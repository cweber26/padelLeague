function updatePriority() {
    deleteOldPriority();
    saveNewPriority();
}

function deleteOldPriority() {
    playersInTheMatchMail().forEach(function (m) {
            deletePriorityWithMail(m);
        }
    );
}

function saveNewPriority() {
    playersInWaitingListMail().forEach(function (m) {
            addPriorityWithMail(m);
        }
    );

}

function deletePriorityWithMail(mail) {
    updatePriorityWithMail(mail, false);
}


function addPriorityWithMail(mail) {
    updatePriorityWithMail(mail, true);
}

function updatePriorityWithMail(mail, value) {
    var row = getRowSheetTeamWithMail(mail);
    sheetTeam.getRange(row, 24).setValue(value);
}