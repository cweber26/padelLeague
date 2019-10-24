function cleaningParam() {
    if ((sheetInscription.getLastRow()) >= 1) {
        sheetInscription.deleteRows(1, sheetInscription.getLastRow());
    }

    clearParameter("mail1");
    clearParameter("mail2");
    clearParameter("mailReminder");
    clearParameter("creationGoogleEvent");
    updateParameter("cleaning", now());
}