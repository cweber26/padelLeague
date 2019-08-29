function init() {
    updatePriority();
    cleaning();
    setNextMatchDate();
    deleteUnavaibility();
    sendInscriptionMailForAPrio(1);
}