function cleaning() {
    if ((sheetInscription.getLastRow() - 1) >= 1) {
        sheetInscription.deleteRows(2, sheetInscription.getLastRow() - 1);
    }

    clearParameterValue("mailSendingPrio1");
    clearParameterValue("mailSendingPrio2");
    clearParameterValue("mailSendingPrio3");
    clearParameterValue("controlDone");
    clearParameterValue("mailSendingReminder");
    clearParameterValue("creationGoogleEvent");
    clearParameterValue("mailSendingConfirmation");
    clearParameterValue("teamSaved");
    updateParameterValue("isMatchCancel", false);
}