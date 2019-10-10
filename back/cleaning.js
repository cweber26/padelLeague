function cleaning() {
    if ((sheetInscription.getLastRow()) >= 1) {
        sheetInscription.deleteRows(1, sheetInscription.getLastRow());
    }

    clearParameterValue("mail1");
    clearParameterValue("mail2");
    clearParameterValue("mailReminder");
    clearParameterValue("creationGoogleEvent");
    updateParameterValue("cleaning", now());
}