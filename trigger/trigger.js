function initialisationMatch() {
  init();
}

function envoiInscriptionGroup2() {
  sendInscriptionMailForAPrio(2);
}

function envoiInscriptionGroup3() {
  sendInscriptionMailForAPrio(3);
}

function autoAnnulation() {
  controlAndCancelOrRelaunch();
}

function rappelMatch() {
  sendReminderMail();
}

function confirmationMatch() {
  sendConfirmMail();
}


function resultatDuMois() {
  sendLastMonthResultMail(); 
}


