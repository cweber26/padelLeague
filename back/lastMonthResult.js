function sendLastMonthResultMail() {
    var body = getLastMonthResultBody();
    var mails = playersLastMonthMails.split(',');
    for (var i in mails) {
        sendMail(mails[i], "Resultats du mois dernier", body);
    }
}

//TODO extract dans un template html
function getLastMonthResultBody() {
    var urlGifLoser = "https://drive.google.com/thumbnail?id=1MzqWyHg31BdCffim1GoL6Y6rb-9sQ7AK";
    var urlGifWinner = "https://drive.google.com/thumbnail?id=1MTedLC1bxxCfVG3Zy7UYbSnU7g8dss4v";
    var winners = sheetRecordFilter.getRange(23, 2, 4, 5).getValues();
    var losers = sheetRecordFilter.getRange(28, 2, 4, 5).getValues();
    var body = "<h1 align=center>Winners</h1>"
        + "<div align=center><img class=none width=300px src=" + urlGifWinner + " /><div>"
        + "<table align=center border=solid width=400px>"
        + "<tbody align='center'><tr>"
        + "<td>Place</td>"
        + "<td>Joueur</td>"
        + "<td>Victoires</td>"
        + "<td>Participations</td>"
        + "</tr>";
    for (var i in winners[0]) {
        body += "<tr>"
            + "<td>" + winners[0][i] + "</td>"
            + "<td>" + winners[1][i] + "</td>"
            + "<td>" + winners[2][i] + "</td>"
            + "<td>" + winners[3][i] + "</td>"
            + "</tr>";
    }
    body += "</tbody></table><br>";
    body += "<h1 align=center>Losers</h1><div align=center>"
        + "<img class=none width=300px src=" + urlGifLoser + " /></div>"
        + "<table align=center border=solid width=400px>"
        + "<tbody align='center'><tr>"
        + "<td>Place</td>"
        + "<td>Joueur</td>"
        + "<td>Défaites</td>"
        + "<td>Participations</td>"
        + "</tr>";
    for (var i in losers[0]) {
        body += "<tr>"
            + "<td>" + losers[0][i] + "</td>"
            + "<td>" + losers[1][i] + "</td>"
            + "<td>" + losers[2][i] + "</td>"
            + "<td>" + losers[3][i] + "</td>"
            + "</tr>";
    }
    body += "</tbody></table><br>";
    return body;
}