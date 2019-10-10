function sendMailSimple(subject, contentHtml) {
    var mails = parametersMap.get("adminMailList").split(',');
    for (var i in mails) {
        var player = getPlayerWithMail(mails[i]);
        sendMailForAnAdmin(player, subject, contentHtml);
    }
}

function sendMailForAnAdmin(player, subject, contentHtml) {
    var body = includeWithArgs("front/mail/mailSimple", {
        html: contentHtml
    });
    sendMail(player.mail, subject, body)
}

function sendMail(mail, subject, html) {
    if (isParameterFalse("modeTest")) {
        MailApp.sendEmail({
            to: mail,
            subject: parametersMap.get("applicationName") + " " + subject,
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
    if (mail.indexOf(parametersMap.get("mailTester")) > -1) {
        MailApp.sendEmail({
            to: parametersMap.get("mailTester"),
            subject: "⚠️Test⚠️ " + parametersMap.get("applicationName") + " " + subject,
            htmlBody: getFinalBody(mail, html)
        });
    }
}
