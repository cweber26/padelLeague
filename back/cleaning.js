function cleaning() {
    if ((sheetInscription.getLastRow() - 1) >= 1) {
        sheetInscription.deleteRows(2, sheetInscription.getLastRow() - 1);
    }

    rangeSending1.clearContent();
    rangeSending2.clearContent();
    rangeSending3.clearContent();
    rangeControl.clearContent();
    rangeReminder.clearContent();
    rangeGoogleEvent.clearContent();
    rangeConfirmation.clearContent();
    rangeCancelMatch.clearContent();
}