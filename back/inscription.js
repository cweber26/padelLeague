function sendInscriptionMailForAPrio(prio) {
    if (numberAvailableSlotInMatch > 0) {
        sendInscriptionMailForAPrioWithoutControl(prio);
    }
    switch (prio) {
        case 1:
            updateParameter("mail1", now());
            clearParameter("cleaning");
            break;
        case 2:
            updateParameter("mail2", now());
            break;
    }
}

function sendInscriptionMailForAPrioWithoutControl(prio) {
    for (var i in playersTeamList) {
        var player = initPlayer(playersTeamList[i]);
        if (shouldReceiveInscriptionMail(player, prio)) {
            sendInscriptionMailForAPlayer(player);
        }
    }
}

function sendInscriptionMailForAPlayer(player) {
    var body = includeWithArgs("front/mail/mailInscription", {
        date: matchDayGapInFrench(true),
        inscription: "https://script.google.com/macros/s/AKfycbzVIY90RhNdhPaWSs8is3rR8v-IMk0H9uBgHwCHx1e26DBVgjBK/exec?page=inscription&mail=" + player.mail + "&answer=Oui",
        desinscription: "https://script.google.com/macros/s/AKfycbzVIY90RhNdhPaWSs8is3rR8v-IMk0H9uBgHwCHx1e26DBVgjBK/exec?page=inscription&mail=" + player.mail + "&answer=Non"
    });
    sendMail(player.mail, "Inscription au match de Padel du " + nextMatchDateInFrench + " ✅", body);
}


function loadPageInscription() {
    return render("front/page/inscription", "PadelLeague",{mail: param.mail, answer: param.answer});
}


function inscription(parameter) {
    Logger.log("Inscription for " + parameter.mail + " and answer " + parameter.answer);
    if (isValidAnswer(parameter)) {
        var playersInTheMatchMailBefore = playersInTheMatchMail();
        if (sheetInscription.getLastRow() > 0) {
            var inscriptions = sheetInscription.getRange(1, 1, sheetInscription.getLastRow(), sheetInscription.getLastColumn()).getValues();
            for (var i in inscriptions) {
                if (inscriptions[i][0] == parameter.mail) {
                    if (inscriptions[i][2] == parameter.answer) {
                        // user already send us the same answer. we do nothing
                        return;
                    } else {
                        // answer different. we delete the row and check if it is a desistement.
                        sheetInscription.deleteRow(Number(i) + 1);
                        checkIfDesistement(parameter, playersInTheMatchMailBefore);
                        break;
                    }
                }
            }
        }
        var row = sheetInscription.getLastRow() + 1;
        sheetInscription.getRange(row, 1).setValue(parameter.mail);
        sheetInscription.getRange(row, 2).setValue(now());
        sheetInscription.getRange(row, 3).setValue(parameter.answer);
    }
}


function isValidAnswer(parameter) {
    if (parameter.answer != "Oui" && parameter.answer != "Non") {
        throw "La réponse ne peut être que Oui ou Non";
    }
    return true;
}
