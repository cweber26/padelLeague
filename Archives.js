/*


var urlFormComposition = "https://docs.google.com/forms/d/e/1FAIpQLSdbdECzrD6EoDr2u2YVp11MLQoqLD2D7ZmbrXXrhelbh0VOOQ/viewform?usp=pp_url&entry.1377838514=";
var urlFormComposition2 = "&entry.189677741=";
var sheetCompositionProposition = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("CompositionProposition");
var formCompoEdit = FormApp.openById("1JyZR4pWDu8MdGHIwJba39aEGfB2f2vZe7DClrqfrOZw");
var formCompoButton = "https://docs.google.com/forms/d/e/1FAIpQLSdbdECzrD6EoDr2u2YVp11MLQoqLD2D7ZmbrXXrhelbh0VOOQ/formResponse";
var rangeForceCompo = sheetBackOffice.getRange("B14");
var choosenCompo = sheetBackOffice.getRange("B15").getValue();
var percentChoosenCompo = sheetBackOffice.getRange("B16").getValue();
var rangeCompositionForm = sheetBackOffice.getRange("N21");


function getcalendarEvent() {
  var calendarEvent = "http://www.google.com/calendar/event?action=TEMPLATE&text="
  +applicationName
  +"&dates="
  +Utilities.formatDate(nextMatchDate, "Europe/Paris", "yyyyMMdd")+"T120000"
  +"/"
  +Utilities.formatDate(nextMatchDate, "Europe/Paris", "yyyyMMdd")+"T140000"
  //+"&details=TOCOMPLETE"
  +"&location="
  +address
  +"&add="
  +getPlayersAvailableMails();
  return encodeURIComponent(calendarEvent);
}

function test() {
  var now = new Date(Date.now());
  var nextMatchDate = sheetBackOffice.getRange("B21").getValue();
  //var currentWeekDay = parseInt(Utilities.formatDate(new Date(), "GMT", "u ### EEEE - dd/MM/yyyy"));

  Logger.log(DateDiff.inHours(nextMatchDate, now));
  Logger.log(DateDiff.inDays(nextMatchDate, now));
  Logger.log(DateDiff.inMonths(nextMatchDate, now));
  Logger.log(DateDiff.inYears(nextMatchDate, now));
}

function sendCompositionForm() {
  if(rangeCompositionForm.isBlank()) {
    logRunDate("composition");
    var playersList = playersInTheMatchMailAndKey();
    for (i in playersList) {
      sendMail(mail(playersList[i]), "Match "+ matchDayGapInFrench(true) +" complet", getBodyChooseComposition(playersList[i]));
    }    
  }
};

function sendUpdateCompositionForm() {
  logRunDate("composition");
  var playersList = playersInTheMatchMailAndKey();
  for (i in playersList) {
    sendMail(mail(playersList[i]), "L'effectif du match "+ matchDayGapInFrench(true) +" a changé", getBodyChooseComposition(playersList[i]));
  }    
};

function getBodyChooseComposition(player) {
  return getPropositionCompo(player)+getFormDirectLink(player, urlFormComposition, urlFormComposition2);
};

function getPropositionCompo(player) {
  var compoA = sheetCompositionProposition.getRange(2, 3, nbMaxPlayers, 1).getValues();
  var compoB = sheetCompositionProposition.getRange(12, 3, nbMaxPlayers, 1).getValues();
  var compoC = sheetCompositionProposition.getRange(22, 3, nbMaxPlayers, 1).getValues();
  var compoD = sheetCompositionProposition.getRange(32, 3, nbMaxPlayers, 1).getValues();
  return "<table border=solid align=center width=600px><thead><tr><th colspan='2'><h4><i>Merci de choisir ta composition favories parmi les compositions proposées</i></h4></th></tr></thead>"
  +"<tbody align=center><tr>"
  +"<td>"+getCompoHtml(getCompoButton("Compo A", "A", player),compoA)+"</td>"
  +"<td>"+getCompoHtml(getCompoButton("Compo B", "B", player),compoB)+"</td>"
  +"</tr><tr>"
  +"<td>"+getCompoHtml(getCompoButton("Compo C", "C", player),compoC)+"</td>"
  +"<td>"+getCompoHtml(getCompoButton("Compo D", "D", player),compoD)+"</td>"
  +"</tr></tbody></table>";  
}

function getCompoButton(label, value, player) {
  return '<br><form action='+formCompoButton+' method="post">'
  + '<button type="submit">'+label+'</button>'
  + '<input type="hidden" name="entry.1377838514" value="'+mail(player)+'">'
  + '<input type="hidden" name="entry.1512506398" value="'+value+'">'
  + '<input type="hidden" name="entry.189677741" value="'+key(player)+'">'
  +'</form>'
}

function getCompoHtml(button, players) {  
  return "<table align=center width=100%><thead><tr><th colspan='2'>"+button+"</th></tr></thead>"
  +"<tbody align='center'><tr>"
  +"<td>"+players[0][0]+"</td>"
  +"<td>"+players[5][0]+"</td>"
  +"</tr><tr>"
  +"<td>"+players[1][0]+"</td>"
  +"<td>"+players[6][0]+"</td>"
  +"</tr><tr>"
  +"<td>"+players[2][0]+"</td>"
  +"<td>"+players[7][0]+"</td>"
  +"</tr><tr>"
  +"<td>"+players[3][0]+"</td>"
  +"<td>"+players[8][0]+"</td>"
  +"</tr><tr>"
  +"<td>"+players[4][0]+"</td>"
  +"<td>"+players[9][0]+"</td>"
  +"</tr></tbody></table>";  
}


var DateDiff = {    
    inHours: function(d1, d2) {
        var t2 = d2.getTime();
        var t1 = d1.getTime();

        return parseInt((t2-t1)/(3600*1000));
    },
    inDays: function(d1, d2) {
        var t2 = d2.getTime();
        var t1 = d1.getTime();

        return parseInt((t2-t1)/(24*3600*1000));
    },
    inWeeks: function(d1, d2) {
        var t2 = d2.getTime();
        var t1 = d1.getTime();

        return parseInt((t2-t1)/(24*3600*1000*7));
    },
    inMonths: function(d1, d2) {
        var d1Y = d1.getFullYear();
        var d2Y = d2.getFullYear();
        var d1M = d1.getMonth();
        var d2M = d2.getMonth();

        return (d2M+12*d2Y)-(d1M+12*d1Y);
    },
    inYears: function(d1, d2) {
        return d2.getFullYear()-d1.getFullYear();
    }
}


*/

