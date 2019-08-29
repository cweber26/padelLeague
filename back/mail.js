function sendMail(mail, subject, html) {
    if (!modeTest) {
        MailApp.sendEmail({
            to: mail,
            subject: applicationName + " " + subject,
            htmlBody: getFinalBody(mail, html)
        });
    } else {
        sendTestMail(mail, subject, html);
    }
}

function getFinalBody(mail, html) {
    return html;
}

function sendTestMail(mail, subject, html) {
    if (mail.indexOf(mailTester) > -1) {
        MailApp.sendEmail({
            to: mailTester,
            subject: "⚠️Test⚠️ " + applicationName + " " + subject,
            htmlBody: getFinalBody(mail, html)
        });
    }
}

function getUrlMail(player) {
    var urlForm = "https://script.google.com/macros/s/AKfycbw7SggSd_5zNsbmfZ3nUU_nr2cXfRYIgntGSLh2n3sNhOJyUDs/exec";
    var urlFormPage = "?page=";
    var urlFormMail = "&mail=";
    var urlFormKey = "&key=";
    var urlFormAnswer = "&answer=";
    return {
        compo: urlForm + urlFormPage + "compo" + urlFormMail + player.mail + urlFormKey + player.keyWithSecurity,
        stat: urlForm + urlFormPage + "stat" + urlFormMail + player.mail + urlFormKey + player.keyWithSecurity,
        record: urlForm + urlFormPage + "record" + urlFormMail + player.mail + urlFormKey + player.keyWithSecurity,
        profil: urlForm + urlFormPage + "profil" + urlFormMail + player.mail + urlFormKey + player.keyWithSecurity,
        inscription: urlForm + urlFormPage + "inscription" + urlFormMail + player.mail + urlFormKey + player.keyWithSecurity + urlFormAnswer + "Oui",
        desinscription: urlForm + urlFormPage + "inscription" + urlFormMail + player.mail + urlFormKey + player.keyWithSecurity + urlFormAnswer + "Non",
        confirmation: urlForm + urlFormPage + "confirmation" + urlFormMail + player.mail + urlFormKey + player.keyWithSecurity + urlFormAnswer + "Oui",
        deconfirmation: urlForm + urlFormPage + "confirmation" + urlFormMail + player.mail + urlFormKey + player.keyWithSecurity + urlFormAnswer + "Non"
    };
}

function getStadiumInfo() {
    return {
        name: stadiumName,
        address: address,
        urlAddress: urlAddress,
        cost: costMatch,
        reservationName: reservationName,
        beginGameHour: beginGameHour,
        infoGame: infoGame
    };
}