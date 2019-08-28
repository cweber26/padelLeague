function hello() {
  Logger.log("Hello, " + world);
}

function test() {
  inscription({mail : "benjamin.lepretre@decathlon.com", key : "666", answer : "Non"});
};

////////////SHEET////////////
var sheetTeam = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Team");
var sheetBackOffice = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("BackOffice");
var sheetInscription = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Inscription");
var sheetResult = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Result");
var sheetResultFilter = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("ResultFilter");
var sheetModifProfil = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("ModifProfil");
var sheetRecordFilter = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("RecordFilter");
var sheetComposition = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Composition");
var sheetStats = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Stats");

////////////RANGE & VALUES////////////
var columnParam = 2;
var firstRowParam = 11;
var applicationName = sheetBackOffice.getRange(firstRowParam, columnParam).getValue();
var nbMaxPlayers = sheetBackOffice.getRange(firstRowParam+1, columnParam).getValue();
var nbLimitPlayers = sheetBackOffice.getRange(firstRowParam+2, columnParam).getValue();
var rangeCancelMatch = sheetBackOffice.getRange(firstRowParam+3, columnParam);
var nbPlayersAvailable = sheetBackOffice.getRange(firstRowParam+4, columnParam).getValue();  
var nbAvailableSlots = sheetBackOffice.getRange(firstRowParam+5, columnParam).getValue();
var nbPlayersWaiting = sheetBackOffice.getRange(firstRowParam+6, columnParam).getValue();
var rangeNextGameDate = sheetBackOffice.getRange(firstRowParam+7, columnParam);
var nextMatchDayFrench = sheetBackOffice.getRange(firstRowParam+8, columnParam).getValue();
var mailsAdmin = sheetBackOffice.getRange(firstRowParam+9, columnParam).getValue();
var playersInTheMatchMails = sheetBackOffice.getRange(firstRowParam+10, columnParam).getValue();
var playersWaitingMails = sheetBackOffice.getRange(firstRowParam+11, columnParam).getValue();
var playersLastMonthMails = sheetBackOffice.getRange(firstRowParam+12, columnParam).getValue();

var firstRowStadium = 25;
var stadiumName = sheetBackOffice.getRange(firstRowStadium, columnParam).getValue();
var address = sheetBackOffice.getRange(firstRowStadium+1, columnParam).getValue();
var urlAddress = sheetBackOffice.getRange(firstRowStadium+2, columnParam).getValue();
var costMatch = sheetBackOffice.getRange(firstRowStadium+3, columnParam).getValue();
var reservationName = sheetBackOffice.getRange(firstRowStadium+4, columnParam).getValue();
var beginGameHour = sheetBackOffice.getRange(firstRowStadium+5, columnParam).getValue();
var infoGame = sheetBackOffice.getRange(firstRowStadium+6, columnParam).getValue();

var firstRowTest = 32;
var modeTest = sheetBackOffice.getRange(firstRowTest, columnParam).getValue();
var mailTester = sheetBackOffice.getRange(firstRowTest+1, columnParam).getValue();

var firstRowLogDate = 34;
var rangeSending1 = sheetBackOffice.getRange(firstRowLogDate, columnParam);
var rangeSending2 = sheetBackOffice.getRange(firstRowLogDate+1, columnParam);
var rangeSending3 = sheetBackOffice.getRange(firstRowLogDate+2, columnParam);
var rangeControl = sheetBackOffice.getRange(firstRowLogDate+3, columnParam);
var rangeReminder = sheetBackOffice.getRange(firstRowLogDate+4, columnParam);
var rangeGoogleEvent = sheetBackOffice.getRange(firstRowLogDate+5, columnParam);
var rangeConfirmation = sheetBackOffice.getRange(firstRowLogDate+6, columnParam);

var rangeCompoUpdated = sheetComposition.getRange(13,2,nbMaxPlayers,1);

var firstRowMatch = 41
var rangeMatchDate = sheetBackOffice.getRange(firstRowMatch, columnParam);
var rangeMatchCompo = sheetBackOffice.getRange(firstRowMatch+1, columnParam, nbMaxPlayers, 1);
var rangeScoreRed = sheetBackOffice.getRange(firstRowMatch+11, columnParam);
var rangeScoreBlue = sheetBackOffice.getRange(firstRowMatch+12, columnParam);

////////////PLAYER LIST////////////
function playersInTheMatchMail() { return sheetBackOffice.getRange(2, 3, nbPlayersAvailable, 1).getValues() };
function playersInWaitingListMail() { return sheetBackOffice.getRange(12, 3, nbPlayersWaiting, 1).getValues() };
function playersAvailableMail() { return sheetBackOffice.getRange(12, 3, (nbPlayersAvailable+nbPlayersWaiting), 1).getValues() };
function playersInTheMatchForFinalCompo() { return sheetComposition.getRange(13, 2, nbMaxPlayers, 11).getValues() };
function playersTeamMailList() { return sheetTeam.getRange(3, 1, sheetTeam.getRange("A3:A").getValues().filter(String).length, 1).getValues() };
function playersTeamList() { return sheetTeam.getRange(3, 1, sheetTeam.getRange("A3:A").getValues().filter(String).length, sheetTeam.getLastColumn()).getValues() };

////////////DATE////////////
var now = new Date(Date.now());
var nextMatchDate = rangeNextGameDate.getValue();
var nextMatchDay = nextMatchDate.getDay();
var currentWeekDay = parseInt(Utilities.formatDate(new Date(), "GMT", "u ### EEEE - dd/MM/yyyy"));

////////////FRONT////////////
var Route = {};
Route.path = function(route, callback) {
  Route[route] = callback;
}

var param = {isAdmin: false};

function doGet(e) {
  param = e.parameters;
  
  Route.path("profil", loadProfil);
  Route.path("inscription", loadInscription);
  Route.path("confirmation", loadConfirmation);
  Route.path("compo", loadCompo);
  Route.path("stat", loadStat);
  Route.path("record", loadRecord);
  Route.path("error", loadError);
  Route.path("invalid", loadInvalidUser);
  Route.path("backoffice", loadBackOffice);
  
  if(!isValidUser(param)) {
    return loadInvalidUser();
  } else if(Route[param.page]) {
    return Route[param.page]();
  } else {
    return loadCompo();
  }
}

function loadBackOffice() {
   return render("backoffice", {mail: param.mail, key: param.key, admin: param.isAdmin}); 
}


function loadInvalidUser() {
   return render("invalid", {mail: param.mail, key: param.key});
}

function loadInscription() {
  if(param.answer=="Oui") {
    return render("inscription", {mail: param.mail, key: param.key, admin: param.isAdmin});
  } else {
    return render("desinscription", {mail: param.mail, key: param.key, admin: param.isAdmin});
  }
}

function loadConfirmation() {
  if(param.answer=="Oui") {
    return render("confirmation", {mail: param.mail, key: param.key, admin: param.isAdmin});
  } else {
    return render("desinscription", {mail: param.mail, key: param.key, admin: param.isAdmin});
  }
}

function loadProfil() {
  var player = getPlayerWithMail(param.mail);
  var mailList = {};
  if(param.isAdmin) {
    mailList = playersTeamMailList();
  }
  return render("profil", {mail: param.mail, key: param.key, player: player, admin: param.isAdmin, mailList: mailList});
}
 
function loadStat() {
  var stats = "";
  var data = sheetStats.getRange(2,1, sheetStats.getLastRow()-1, sheetStats.getLastColumn()).getValues();
  data.forEach(function(p) {
    stats += "<tr>"
      +"<td>"+p[0]+"</td>"
      +"<td>"+p[1]+"</td>"
      +"<td>"+p[2]+"</td>"
      +"<td>"+p[3]+"</td>"
      +"<td>"+p[4]+"</td>"
      +"<td>"+p[5]+"</td>"
      +"<td>"+p[6]+"</td>"
      +"<td>"+p[7]+"</td>"
      +"<td>"+p[8]+"</td>"
      +"<td>"+p[9]+"</td>"
      +"<td>"+p[13]+"</td>"
      +"<td>"+p[14]+"</td>"
      +"<td>"+getLumieres(p)+"</td>"
      +"</tr>";
  });
  return render("stat", {mail: param.mail, key: param.key, table : stats, admin: param.isAdmin});
}

function getLumieres(p) {
  return "<div class='lumieres'>"+getLumiere(p[17])+getLumiere(p[18])+getLumiere(p[19])+getLumiere(p[20])+getLumiere(p[21])+"</div>";
}

function getLumiere(value) {
  if(value=='V') {
    return "<div class='lum green'></div>";
  } else if (value == 'D') {
    return "<div class='lum red'></div>";
  } else if (value == 'N'){
    return "<div class='lum yellow'></div>";
  } else {
    return "";
  }
}

function loadRecord() {
  var victoryPercentage = sheetRecordFilter.getRange(2, 2, 2, 3).getValues();
  var losePercentage = sheetRecordFilter.getRange(5, 2, 2, 3).getValues();
  var victoryInRow = sheetRecordFilter.getRange(8, 2, 2, 3).getValues();
  var loseInRow = sheetRecordFilter.getRange(11, 2, 2, 3).getValues();
  var participation = sheetRecordFilter.getRange(20, 2, 2, 3).getValues();
  var victory = sheetRecordFilter.getRange(24, 2, 3, 3).getValues();
  var lose = sheetRecordFilter.getRange(29, 2, 3, 3).getValues();
  
  return render("record", {mail: param.mail, 
                           key: param.key, 
                           admin: param.isAdmin,
                           victoryPercentage: victoryPercentage,
                           losePercentage: losePercentage,
                           victoryInRow: victoryInRow,
                           loseInRow: loseInRow,
                           participation: participation,
                           victory: victory,
                           lose: lose
                          });
}

function loadError() {
  return render("error", {mail: param.mail, key: param.key, admin: param.isAdmin});
}

function loadCompo() {
  var players = []; 
  var confirmations = []; 
  var effectif = "";
  var listeAttente = "";
  if(nbPlayersAvailable>0) {
    var data = playersInTheMatchForFinalCompo();
    data.forEach(function(p) { 
      players.push(p[1]);
      confirmations.push(p[10]);
      var test = p[0];
      if(p[0]){
        effectif+="<tr>"
        +"<td>"+p[9]+"</td>"
        +"<td>"+p[0]+"</td>"
        +"<td>"+p[1]+"</td>"
        +"<td>"+p[6]+"</td>"
        +"<td>"+p[7]+"</td>"
        +"<td>"+getSerieLumieres(p[8])+"</td>"
        +"</tr>";
      }
    });
  }
  if(nbPlayersWaiting>0) {
    playersInWaitingListMail().forEach(function(m) { 
      var player = getPlayerWithMail(m);
      listeAttente+= "<tr>"
      +"<td>"+player.fullName+"</td>"
      +"</tr>"; 
    });
  }
  var score = {};
  if(!rangeScoreBlue.isBlank()) {
    score.blue = rangeScoreBlue.getValue();
  }
  if(!rangeScoreRed.isBlank()) {
    score.red = rangeScoreRed.getValue();
  }
  
  return render("compo", {mail: param.mail, 
                          key: param.key, 
                          date:matchDayGapInFrench(true), 
                          compo: players, 
                          inscriptionPhase: !rangeSending1.isBlank(),
                          confirmationPhase: !rangeReminder.isBlank(),
                          confirmations: confirmations, 
                          effectif: effectif, 
                          listeAttente: listeAttente, 
                          admin: param.isAdmin,
                          score: score
                         });
}

function getSerieLumieres(p) {
  var html = "<div class='serieLumieres'>"
  for(var i = 0; i < p.length; i++) {
    html+= getLumiere(p.substring(i,i+1));
  }
  html+="</div>"
  return html;
}

function inscription(parameter) {  
  if(isValid(parameter)) {
    var isDesistement=false;
    var playersInTheMatchMailBefore = playersInTheMatchMail();
    if(sheetInscription.getLastRow()>1) {
      var inscriptions = sheetInscription.getRange(2,1,sheetInscription.getLastRow(), sheetInscription.getLastColumn()).getValues();
      for(i in inscriptions) {
        var inscription = inscriptions[i];
        if(inscription[1] == parameter.mail) {
          if(inscription[3] == parameter.answer){
            return;
          } else {
            sheetInscription.deleteRow(Number(i)+2);
            if(parameter.answer == "Non") {
              for(i in playersInTheMatchMailBefore) {
                if(playersInTheMatchMailBefore[i] == parameter.mail) {
                  isDesistement = true;
                  break;
                }
              }
            }
            break;
          }
        }    
      }
    }
    var row = sheetInscription.getLastRow()+1;
    sheetInscription.getRange(row,1).setValue(new Date(Date.now()));
    sheetInscription.getRange(row,2).setValue(parameter.mail);
    sheetInscription.getRange(row,3).setValue(parameter.key);
    sheetInscription.getRange(row,4).setValue(parameter.answer);
    
    if(nbPlayersAvailable<nbMaxPlayers-1 && parameter.answer=="Oui") {
      sendMail(mailsAdmin,"Match complet", getCompoHtml(getPlayerWithMail(mailsAdmin), false));    
    }
    
    if(isDesistement) {
      actionsToDoIfDesistement();
    }
  }  
}

function confirmation(parameter) {  
  var inscriptions = sheetInscription.getRange(2,1,sheetInscription.getLastRow(), sheetInscription.getLastColumn()).getValues();
  for(i in inscriptions) {
    var inscription = inscriptions[i];
    if(inscription[1] == parameter.mail && (inscription[2] == parameter.key || parameter.key == "666")) {
      
      var isDesistement=false;
      var nbPlayersAvailableBefore = nbPlayersAvailable;
      var playersInTheMatchMailBefore = playersInTheMatchMail();
      
      var row = Number(i)+2;
      sheetInscription.getRange(row,5).setValue(new Date(Date.now()));
      sheetInscription.getRange(row,6).setValue(parameter.answer);
      sheetInscription.getRange(row,4).setValue(parameter.answer);
      if(parameter.answer == "Non") {
        actionsToDoIfDesistement();
      }
      return;
    }    
  }  
}

function actionsToDoIfDesistement() {
  if(rangeCancelMatch.isBlank()) {
    if(nbPlayersAvailable==nbMaxPlayers && nbPlayersWaiting>0) {
      var player = getNewPlayer();
      Logger.log(player);
      if(rangeReminder.isBlank()) {
        sendMail(player.mail,"Tu es sélectionné pour le match " + matchDayGapInFrench(true) + " en raison d'un désitement", getCompoHtml(player, true));
      } else {
        if(rangeConfirmation.isBlank()) {
          sendRemindMailForAPlayer(player, true);
        } else {
          sendConfirmMailForAPlayer(player, true); 
        }
        updateMatch();
        deleteCalendarEvent();
        createCalendarEvent();
        sendMail(mailsAdmin,"Alerte : l'effectif de l'équipe a changé", "<h4 align=center> nouveau joueur : " + player.fullname);
      }
    } else {
      sendMail(mailsAdmin,"Alerte : il manque " + nbAvailableSlots + " joueur(s) pour le match "+ matchDayGapInFrench(true),
      "<h2 align=center>Il manque " + nbAvailableSlots + " joueur(s) pour le match "+ matchDayGapInFrench(true) + "</h2>");
    }
  }
}


function getNewPlayer() {
  var mail = playersInTheMatchMail()[9];
  return getPlayerWithMail(mail);
}

function isValid(parameter) {
  if(parameter.answer != "Oui" && parameter.answer != "Non"){ 
    return false; 
  }
  var rowPlayer = getRowPlayerWithMail(parameter.mail)
  if(!rowPlayer){
    return false;
  }
  return true; 
}

function isKeyValid(keyToCheck, key) {
  return keyToCheck == (key*2+10) || keyToCheck == "666";
}

////////////INIT////////////
function init() {
  updatePriority();
  cleaning(); 
  setNextMatchDate(); 
  deleteUnavaibility();
  sendInscriptionMailForAPrio(1);
}

////////////CLEANING////////////
function cleaning() {  
  if((sheetInscription.getLastRow()-1) >= 1) {sheetInscription.deleteRows(2, sheetInscription.getLastRow()-1);}
  rangeSending1.clearContent();
  rangeSending2.clearContent();
  rangeSending3.clearContent();
  rangeReminder.clearContent();
  rangeControl.clearContent();
  rangeConfirmation.clearContent();
  rangeCancelMatch.clearContent();
  rangeGoogleEvent.clearContent();
}

////////////INSCRIPTION////////////
function sendInscriptionMailForAPrio(prio) { 
  if(rangeCancelMatch.isBlank() && nbAvailableSlots>0) {    
    var playersList = playersTeamList();
    for (i in playersList) {
      var player = initPlayer(playersList[i]);
      if(isAuthorized(player, prio)) { 
        sendInscriptionMail(player); 
      }
    }
  }
  logRunDate(prio);
}

function sendInscriptionMail(player) {
  var body = includeWithArgs("mailInscription", {date: matchDayGapInFrench(true), 
                                                 nbAvailableSlots:nbAvailableSlots, 
                                                 urlMail: getUrlMail(player), 
                                                 stadium: getStadiumInfo(), 
                                                 evalToDo: !player.haveDoneAutoEvaluation});
  sendMail(player.mail, "Inscription au match de Footsal du "+ nextMatchDayFrench + " ✅", body); 
}

////////////CONTROL////////////
function controlAndCancelOrRelaunch() {
  if(rangeCancelMatch.isBlank() && rangeControl.isBlank()) {
    if((nbPlayersAvailable>0 && nbPlayersAvailable<nbLimitPlayers)) {
      sendCancelMatch(true);
      sendMail(mailsAdmin,"Pense à annuler le match "+ matchDayGapInFrench(true),"<h1 align=center><a href='https://my.urbansoccer.fr/user'>UrbanSoccer</a></h1>");    
      rangeCancelMatch.setValue(true);
    } else if(nbPlayersAvailable>=nbLimitPlayers && nbPlayersAvailable<nbMaxPlayers) {
      sendInscriptionMailForAPrio(3);
    } 
    logRunDate("control");
  }
}

////////////CANCEL////////////
function sendCancelMatch(isAutoCancel) {
  var objectHtml = "⛔ Annulation du match de Footsal "+ matchDayGapInFrench(true) +" ⛔😢";
  var playerMails = playersInTheMatchMail();
  for (i in playerMails) {
    var player = getPlayerWithMail(playerMails[i]);
    sendCancelMatchForAPlayer(player, isAutoCancel);
  }
}


function sendCancelMatchForAPlayer(player, isAutoCancel) {
  var body = includeWithArgs("mailCancelMatch", {date: matchDayGapInFrench(true), 
                                                 player: player, 
                                                 nbLimitPlayers: nbLimitPlayers, 
                                                 isAutoCancel: isAutoCancel,
                                                 urlMail: getUrlMail(player)});
  sendMail(player.mail, "⛔ Annulation du match de Footsal "+ matchDayGapInFrench(true) +" ⛔😢", body);
}  

function manualCancelling() {
  sendCancelMatch(false);
}

////////////REMINDER////////////
function sendReminderMail() {
  if(rangeCancelMatch.isBlank() && rangeReminder.isBlank()) {        
    if(nbPlayersAvailable==nbMaxPlayers) {
      saveMatch();
      createCalendarEvent();
    }
    
    var matchMails = playersInTheMatchMail();
    for (i in matchMails) {
      var player = getPlayerWithMail(matchMails[i]);
      sendRemindMailForAPlayer(player, false);
    }
    
    if(nbPlayersWaiting>0) {
      var waitingListMails = playersInWaitingListMail();
      for(i in waitingListMails) {
        var player = getPlayerWithMail(waitingListMails[i]);        
        sendWaitingListMail(player);
      }
    }
    logRunDate("reminder");
  }
}

function sendWaitingListMail(player) {
  var body = includeWithArgs("mailWaitingList", { date: matchDayGapInFrench(true), urlMail: getUrlMail(player) });        
  sendMail(player.mail, "Liste d'attente pour le match "+matchDayGapInFrench(true), body);
}

function sendRemindMailForAPlayer(player, isNewPlayer) {
  sendMail(player.mail, "Rappel : Match de footsal "+matchDayGapInFrench(false)+" 🤙🤙", getCompoHtml(player, isNewPlayer));
}


function getCompoHtml(player, isNewPlayer) {
  return includeWithArgs("mailReminder", {date: matchDayGapInFrench(true), 
                                          nbAvailableSlots: nbAvailableSlots, 
                                          compo: getCompoPlayersListForMail(), 
                                          isNewPlayer: isNewPlayer, 
                                          urlMail: getUrlMail(player), 
                                          stadium: getStadiumInfo()}); 
}

function getCompoPlayersListForMail() {
  var players = []; 
  if(nbPlayersAvailable>0) {
    var data = playersInTheMatchForFinalCompo();
    data.forEach(function(p) { 
      players.push(p[1]);
    });
  }
  return players;
}

////////////CONFIRM////////////
function sendConfirmMail() {  
  if(rangeCancelMatch.isBlank() && rangeConfirmation.isBlank()) {
    
    var mails = playersInTheMatchMail();
    for (i in mails) {
      var player = getPlayerWithMail(mails[i]);
      sendConfirmMailForAPlayer(player, false);
    }
    logRunDate("confirmation");
  }  
}

function sendConfirmMailForAPlayer(player, isNewPlayer) {
  var body = includeWithArgs("mailConfirmation", {date: matchDayGapInFrench(true), 
                                                  nbAvailableSlots:nbAvailableSlots, 
                                                  stadium: getStadiumInfo(), 
                                                  urlMail: getUrlMail(player), 
                                                  isNewPlayer: isNewPlayer,
                                                  compo: getCompoPlayersListForMail(), 
                                                  playersInTheMatchMails: playersInTheMatchMails, 
                                                  subjectMailContact: encodeURIComponent(applicationName+" Conversation du match du"+nextMatchDayFrench)});
  sendMail(player.mail, "Confirmation de présence au match de Footsal "+matchDayGapInFrench(true)+ " ✅", body); 
}

////////////COMPOSITION////////////
function saveMatch() {
  rangeMatchDate.setValue(nextMatchDate);
  rangeMatchCompo.setValues(rangeCompoUpdated.getValues());
  rangeScoreRed.clearContent();
  rangeScoreBlue.clearContent();
}
 
function updateMatch() {
  rangeMatchDate.setValue(nextMatchDate);
  rangeMatchCompo.setValues(rangeCompoUpdated.getValues());
}

////////////PRIORITY////////////
function updatePriority() {
  deleteOldPriority();
  saveNewPriority();
}

function deleteOldPriority() {
  if(nbPlayersAvailable>0) {
    var mails = playersInTheMatchMail();
    for(i in mails) {
      var row = getRowSheetTeamWithMail(mails[i]);
      sheetTeam.getRange(row,24).setValue(false);
    }
  }
}

function saveNewPriority() {
  if(nbPlayersWaiting>0) {
    var mails = playersInWaitingListMail();
    for(i in mails) {
      var row = getRowSheetTeamWithMail(mails[i]);
      sheetTeam.getRange(row,24).setValue(true);
    }
  }
}

function getRowSheetTeamWithMail(mail) {
  var teamList = playersTeamList();
  for(var i = 0; i<teamList.length;i++){
    if(teamList[i][0] == mail){
      return i+3;
    }
  }
}

////////////MAIL////////////
function sendMail(mail, subject, html) {
  if(!modeTest) {       
    MailApp.sendEmail({
      to: mail,
      subject: applicationName+" "+subject,
      htmlBody: getFinalBody(mail, html)
    });
  } else {
    sendTestMail(mail, subject, html);
  }
}

function getFinalBody(mail,html) {
  return html;
}

function sendTestMail(mail, subject, html) {
  if(mail.indexOf(mailTester)>-1) {
    MailApp.sendEmail({
      to: mailTester,
      subject: "⚠️Test⚠️ " + applicationName + " " + subject,
      htmlBody: getFinalBody(mail,html)
    }); 
  }
}

function getUrlMail(player) {
  var urlForm = "https://script.google.com/macros/s/AKfycbw7SggSd_5zNsbmfZ3nUU_nr2cXfRYIgntGSLh2n3sNhOJyUDs/exec"
  var urlFormPage = "?page="
  var urlFormMail = "&mail=";
  var urlFormKey = "&key=";
  var urlFormAnswer = "&answer=";
  var hashConfirmation = "#confirmation";
  var urlFormModificationProfilMail = "https://docs.google.com/forms/d/e/1FAIpQLScjKpJRR5sAp4_4PxmV2-25-cLOeqq4CuETwZDIajXbFxlk9g/viewform?usp=pp_url&entry.2115706366=";
  var urlFormModificationProfilKey = "&entry.1083084672=";
  var urlMail = {
    compo: urlForm+urlFormPage+"compo"+urlFormMail+player.mail+urlFormKey+player.keyWithSecurity,
    stat: urlForm+urlFormPage+"stat"+urlFormMail+player.mail+urlFormKey+player.keyWithSecurity,
    record: urlForm+urlFormPage+"record"+urlFormMail+player.mail+urlFormKey+player.keyWithSecurity,
    profil: urlForm+urlFormPage+"profil"+urlFormMail+player.mail+urlFormKey+player.keyWithSecurity,
    inscription: urlForm+urlFormPage+"inscription"+urlFormMail+player.mail+urlFormKey+player.keyWithSecurity+urlFormAnswer+"Oui",
    desinscription: urlForm+urlFormPage+"inscription"+urlFormMail+player.mail+urlFormKey+player.keyWithSecurity+urlFormAnswer+"Non",
    confirmation: urlForm+urlFormPage+"confirmation"+urlFormMail+player.mail+urlFormKey+player.keyWithSecurity+urlFormAnswer+"Oui",
    deconfirmation: urlForm+urlFormPage+"confirmation"+urlFormMail+player.mail+urlFormKey+player.keyWithSecurity+urlFormAnswer+"Non"
  };
  return urlMail;
}

function getStadiumInfo() {
  var stadium = {
    name: stadiumName,
    address: address,
    urlAddress: urlAddress,
    cost: costMatch,
    reservationName: reservationName,
    beginGameHour: beginGameHour,
    infoGame: infoGame
  };
  return stadium;
}

////////////DATE////////////
function setNextMatchDate() {  
  switch(currentWeekDay) 
  {  
    case 1:
      var nextMatchDate = nextDay(3);
      break;
    case 2:
      var nextMatchDate = nextDay(3);
      break;
    case 3:
      var nextMatchDate = nextDay(5);
      break;
    case 4:
      var nextMatchDate = nextDay(5);
      break;
    case 5:
      var nextMatchDate = nextDay(3);
      break;
    default:
      var nextMatchDate = nextDay(3);
  }
  rangeNextGameDate.setValue(nextMatchDate);
}

function nextDay(weekDay) { 
  if(currentWeekDay < weekDay) {  
    var cptDay = weekDay-currentWeekDay; 
  } else if(currentWeekDay == weekDay) {
    var cptDay=7; 
  } else {  
    var cptDay = (7-(currentWeekDay-weekDay)); 
  } 
  return Utilities.formatDate(new Date(Date.now() + ((cptDay*1000)*60*60*24)), "GMT", "MM/dd/yy");  
}

function haveSelectedMatchDay(player, nextMatchDay) {
  switch(nextMatchDay) 
  {  
    case 1:
      return player.mondaySelected==true;
    case 2:
      return player.tuesdaySelected==true;
    case 3:
      return player.wednesdaySelected==true;
    case 4:
      return player.thursdaySelected==true;
    case 5:
      return player.fridaySelected==true;   
    default:
      return false;
  }
}

function matchDayGapInFrench(withPronom) {
  switch(nextMatchDay-new Date().getDay()) 
  {  
    case -6:
      if(withPronom) {return "de demain"} else {return "demain"};
    case 0:
      if(withPronom) {return "de ce midi"} else {return "midi"};
    case 1:
      if(withPronom) {return "de demain"} else {return "demain"};
    default:
      if(withPronom) {return "du "+nextMatchDayFrench} else {return nextMatchDayFrench};
  }
}


////////////LOG////////////
function logRunDate(type) {
    switch(type) 
    {  
      case 1:
        rangeSending1.setValue(now);
        break;
      case 2:
        rangeSending2.setValue(now);
        break;
      case 3:
        rangeSending3.setValue(now);
        break;
      case "reminder":
        rangeReminder.setValue(now);
        break;
      case "control":
        rangeControl.setValue(now);
        break;
      case "confirmation":
        rangeConfirmation.setValue(now);
        break;
      case "googleEvent":
        rangeGoogleEvent.setValue(now);
        break;        
    }
};

/////////////CALENDAR///////////
function createCalendarEvent() {
  if(rangeGoogleEvent.isBlank()) {
    var calendar = CalendarApp.getDefaultCalendar()
    var begin = new Date(Utilities.formatDate(nextMatchDate, "Europe/Paris", "MM/dd/yyyy")+" 12:00:00");
    var end = new Date(Utilities.formatDate(nextMatchDate, "Europe/Paris", "MM/dd/yyyy")+" 14:00:00");
    var mails = playersInTheMatchMails;
    if(modeTest) {
      var mails = mailsAdmin;
    } 
    calendar.createEvent(applicationName,begin,end,{location: address, guests: mails, sendInvites: false});
    logRunDate("googleEvent");
  }
}

function deleteCalendarEvent() {
  var calendar = CalendarApp.getDefaultCalendar();
  var begin = new Date(Utilities.formatDate(nextMatchDate, "Europe/Paris", "MM/dd/yyyy")+" 12:00:00");
  var end = new Date(Utilities.formatDate(nextMatchDate, "Europe/Paris", "MM/dd/yyyy")+" 14:00:00");
  var events = calendar.getEvents(begin, end);
  for (i in events){
    if(events[i].getTitle() == applicationName) {
      events[i].deleteEvent();      
    }
  }
  rangeGoogleEvent.clearContent();
}

////////////SCORE////////////
function saveScore(scoreValue) {
  if(scoreValue.rouge && scoreValue.bleu) {
    var row = sheetResult.getRange("A1:A").getValues().filter(String).length+2;
    var players = rangeMatchCompo.getValues();  
    if(sheetResult.getRange(row-1,1).getValue().getTime() != rangeMatchDate.getValue().getTime()) {  
      sheetResult.getRange(row,1).setValue(rangeMatchDate.getValue());
      sheetResult.getRange(row,2).setValue(players[0][0]);
      sheetResult.getRange(row,3).setValue(players[1][0]);
      sheetResult.getRange(row,4).setValue(players[2][0]);
      sheetResult.getRange(row,5).setValue(players[3][0]);
      sheetResult.getRange(row,6).setValue(players[4][0]);
      sheetResult.getRange(row,7).setValue(players[5][0]);
      sheetResult.getRange(row,8).setValue(players[6][0]);
      sheetResult.getRange(row,9).setValue(players[7][0]);
      sheetResult.getRange(row,10).setValue(players[8][0]);
      sheetResult.getRange(row,11).setValue(players[9][0]);  
    } else if (sheetResult.getRange(row-1,1).getValue().getTime() == rangeMatchDate.getValue().getTime()) {
      row = row-1;  
    }
    sheetResult.getRange(row,12).setValue(scoreValue.rouge);
    sheetResult.getRange(row,13).setValue(scoreValue.bleu);
    rangeScoreRed.setValue(scoreValue.rouge);
    rangeScoreBlue.setValue(scoreValue.bleu);
    stats(players);
    logRunDate("scoreSave");
  }
}

////////////STAT////////////
function playerNameInSheetResultFilter() { 
  return sheetResultFilter.getRange(4, 1, sheetResultFilter.getRange("A4:A").getValues().filter(String).length, 1).getValues();
}

function initStats() {
  stats(playerNameInSheetResultFilter());
}

function stats(players) {
  for (i in players) {
    if(players[i][0]) {
      statsForAPlayer(players[i][0]);
    }
  }
}

function statsForAPlayer(playerName) {
  var resultFilterColumn = 13;
  var row = getRowSheetResultFilter(playerName);
  var serie = sheetResultFilter.getRange(row,resultFilterColumn+4,1,sheetResultFilter.getLastColumn()).getValues()[0].filter(String);
  var maxWin = 0;
  var maxLose = 0;
  var winInProgress = 0;
  var loseInProgress = 0;
  var current = '';
  var previous = '';
  var inProgressDone = false;
  if(serie.length>0) {
    var win = 0;
    var lose = 0;
    for (i in serie) {
      current = serie[i];
      
      if(!inProgressDone && (previous==''||current==previous) && current != 'N'){
        if(current=='V'){winInProgress+=1} else if(current=='D'){loseInProgress+=1};
      } else {
        inProgressDone = true;
      }
      
      if(current!=previous) {win = 0; lose = 0;}
      if(current=='V'){win+=1};
      if(current=='D'){lose+=1};
      if(win>maxWin) {maxWin = win;};
      if(lose>maxLose) {maxLose = lose;};
      previous = current;
    }
  }
  sheetResultFilter.getRange(row, resultFilterColumn).setValue(maxWin);
  sheetResultFilter.getRange(row, (resultFilterColumn+1)).setValue(maxLose);
  sheetResultFilter.getRange(row, (resultFilterColumn+2)).setValue(winInProgress);
  sheetResultFilter.getRange(row, (resultFilterColumn+3)).setValue(loseInProgress);
}


function getRowSheetResultFilter(playerName) {
  var playerNames = playerNameInSheetResultFilter();
  for(var i = 0; i<playerNames.length;i++){
    if(playerNames[i][0] == playerName){
      return i+4;
    }
  }
}

function sendLastMonthResultMail() {
  var body = getLastMonthResultBody();
  var mails = playersLastMonthMails.split(',');
  for(i in mails) {
    sendMail(mails[i],"Resultats du mois dernier",body);
  }
}

function getLastMonthResultBody() {  
  var urlGifLoser = "https://drive.google.com/thumbnail?id=1MzqWyHg31BdCffim1GoL6Y6rb-9sQ7AK";
  var urlGifWinner = "https://drive.google.com/thumbnail?id=1MTedLC1bxxCfVG3Zy7UYbSnU7g8dss4v";
  var winners = sheetRecordFilter.getRange(23, 2, 4, 5).getValues();
  var losers = sheetRecordFilter.getRange(28, 2, 4, 5).getValues();
  var body = "<h1 align=center>Winners</h1>"
  +"<div align=center><img class=none width=300px src="+urlGifWinner+" /><div>"
  +"<table align=center border=solid width=400px>"
  +"<tbody align='center'><tr>"
  +"<td>Place</td>"
  +"<td>Joueur</td>"
  +"<td>Victoires</td>"
  +"<td>Participations</td>"
  +"</tr>";
  for(i in winners[0]) {
    body+="<tr>"
    +"<td>"+winners[0][i]+"</td>"
    +"<td>"+winners[1][i]+"</td>"
    +"<td>"+winners[2][i]+"</td>"
    +"<td>"+winners[3][i]+"</td>"
    +"</tr>";
  }
  body += "</tbody></table><br>";   
  body += "<h1 align=center>Losers</h1><div align=center>"
  +"<img class=none width=300px src="+urlGifLoser+" /></div>"
  +"<table align=center border=solid width=400px>"
  +"<tbody align='center'><tr>"
  +"<td>Place</td>"
  +"<td>Joueur</td>"
  +"<td>Défaites</td>"
  +"<td>Participations</td>"
  +"</tr>";
  for(i in losers[0]) {
    body+="<tr>"
    +"<td>"+losers[0][i]+"</td>"
    +"<td>"+losers[1][i]+"</td>"
    +"<td>"+losers[2][i]+"</td>"
    +"<td>"+losers[3][i]+"</td>"
    +"</tr>";
  }
  body += "</tbody></table><br>";   
  return body;
}

////////////PLAYER////////////
function isAuthorized(player, prior) {
  if(player.mail
  && player.prioValue<=prior
  && player.haveAlreadyAnswer==false
  && player.isUnavailable==false
  && haveSelectedMatchDay(player, nextMatchDay)) {
    return true; 
  }
}


function getPlayerWithFullName(fullName) {
  var teamList = playersTeamList();
  for(var i = 0; i<teamList.length;i++){
    if(teamList[i][4] == fullName){
      var p = sheetTeam.getRange(i+3, 1, 1, sheetTeam.getLastColumn()).getValues()[0];
      return initPlayer(p);
    }
  }
}

function getPlayerWithMail(mail) {
  var teamList = playersTeamList();
  for(var i = 0; i<teamList.length;i++){
    if(teamList[i][0] == mail){
      var p = sheetTeam.getRange(i+3, 1, 1, sheetTeam.getLastColumn()).getValues()[0];
      return initPlayer(p);
    }
  }
}

function initPlayer(p) {
  var player = {
        mail: p[0],
        key: p[1],
        keyWithSecurity: (p[1]*2+10),
        firstName: p[2],
        lastName: p[3],
        fullName: p[4],
        shortfullName: p[5],
        nickName: p[6],
        isUnavailable: p[7],
        endDateOfUnavailibility: p[8],
        mondaySelected: p[9],
        tuesdaySelected: p[10],
        wednesdaySelected: p[11],
        thursdaySelected: p[12],
        fridaySelected: p[13],
        site: p[14],
        position: p[15],
        levelDribble: p[16],
        levelFrappe: p[17],
        levelDefense: p[18],
        haveDoneAutoEvaluation: p[19],
        haveAlreadyAnswer: p[20],
        prioValue: p[21],
        isAdmin: p[22],
        isPrioritary: p[23],
      };
  return player;
}

function isValidUser(param) {
  var player = getPlayerWithMail(param.mail);
  if(player) {
     if(isKeyValid(param.key, player.key)) {
       if(player.isAdmin) {
         param.isAdmin = true;
       }
       return true;
     }
  }
  return false;
}

////////////PROFIL////////////
function updateProfil(user) {
  
  var row = getRowPlayerWithMail(user.mail);

  if(user.key == (sheetTeam.getRange(row,2).getValue()*2+10)) {
    var firstName = user.prenom;
    var lastName = user.nom;
    var nickName = user.surnom;
    var unavailable = user.indispo;
    
    var dateEuropeFormat = user.indispoDate;
    var year = dateEuropeFormat.substring(6, 10);
    var month = dateEuropeFormat.substring(3, 5);
    var day = dateEuropeFormat.substring(0, 2);
    var endDate = new Date(year, month - 1, day);

    var monday = user.lundi;
    var tuesday = user.mardi;
    var wednesday = user.mercredi;
    var thursday = user.jeudi;
    var friday = user.vendredi;
    var site = user.site;
    var position = user.poste;
    var levelDribble = user.dribble;
    var levelFrappe = user.frappe;
    var levelDefense = user.defense;
    
    var oldFirstName = sheetTeam.getRange(row,3).getValue();
    var oldLastName = sheetTeam.getRange(row,4).getValue();
    if(oldFirstName != firstName || oldLastName != lastName) {
      updateNameProfil(oldFirstName, firstName, oldLastName, lastName, row);
    }   
    
    if(nickName) {sheetTeam.getRange(row,7).setValue(nickName)};
    if(unavailable) {
      sheetTeam.getRange(row,8).setValue(true);
      sheetTeam.getRange(row,9).setValue(new Date(Utilities.formatDate(endDate, "Europe/Paris", "MM/dd/yy")));
    } else {
      sheetTeam.getRange(row,8).setValue(false);
      sheetTeam.getRange(row,9).setValue("");
    };
    if(monday) {sheetTeam.getRange(row,10).setValue(true)} else {sheetTeam.getRange(row,10).setValue(false)};
    if(tuesday) {sheetTeam.getRange(row,11).setValue(true)} else {sheetTeam.getRange(row,11).setValue(false)};
    if(wednesday) {sheetTeam.getRange(row,12).setValue(true)} else {sheetTeam.getRange(row,12).setValue(false)};
    if(thursday) {sheetTeam.getRange(row,13).setValue(true)} else {sheetTeam.getRange(row,13).setValue(false)};
    if(friday) {sheetTeam.getRange(row,14).setValue(true)} else {sheetTeam.getRange(row,14).setValue(false)};
    if(site) {sheetTeam.getRange(row,15).setValue(site)};
    if(position) {sheetTeam.getRange(row,16).setValue(position)};
    if(levelDribble) {sheetTeam.getRange(row,17).setValue(levelDribble)};
    if(levelFrappe) {sheetTeam.getRange(row,18).setValue(levelFrappe)};
    if(levelDefense) {sheetTeam.getRange(row,19).setValue(levelDefense)};
    if(levelDribble && levelFrappe && levelDefense) {sheetTeam.getRange(row,20).setValue(true)};
  } else {
    throw "clef non valide";
  }
}

function getRowPlayerWithMail(email){
  var playersList = playersTeamList();
  for(i in playersList) {
    var player = initPlayer(playersList[i]);
    if(email == player.mail) {
      return Number(i)+3;
    }
  }
}

function updateNameProfil(oldFirstName, firstName, oldLastName, lastName, row) {
  if(firstName != oldFirstName) {
    sheetTeam.getRange(row,3).setValue(firstName);
  } else {
    firstName=oldFirstName;
  }
  if(lastName != oldLastName) {
    sheetTeam.getRange(row,4).setValue(lastName);
  } else {
    lastName=oldLastName;
  }
  var oldFullName = oldFirstName + " " + oldLastName;
  var newFullName = firstName + " " + lastName;
  var rangeResult = sheetResult.getRange(4,2,sheetResult.getLastRow(), 13);
  var resultValues = rangeResult.getValues();
  replaceInSheet(resultValues, oldFullName, newFullName);
  rangeResult.setValues(resultValues); 
}

function replaceInSheet(values, to_replace, replace_with) {
  for(var row in values){
    var replaced_values = values[row].map(function(original_value) {
      return original_value.toString().replace(to_replace,replace_with);
    });
    values[row] = replaced_values;
  }
}

function deleteUnavaibility() {
  var playersList = playersTeamList();
  for(i in playersList) {
    var player = playersList[i];
    if(player.endDateOfUnavailibility) {
      if(player.endDateOfUnavailibility.valueOf()<nextMatchDate.valueOf()){
        sheetTeam.getRange(Number(i)+3, 8).setValue(false);
        sheetTeam.getRange(Number(i)+3, 9).clearContent();
      }
    }
  }
}

////////////UTIL////////////
function include(fileName) {
  return HtmlService.createHtmlOutputFromFile(fileName).getContent();
}

function includeWithArgs(fileName, argsObject) {
  var tmp = HtmlService.createTemplateFromFile(fileName);
  if(argsObject) {
    var keys = Object.keys(argsObject);
    keys.forEach(function(key) {
      tmp[key] = argsObject[key];
    })
  }
  return tmp.evaluate().getContent();
}

function render(file, argsObject) {
  var tmp = HtmlService.createTemplateFromFile(file);
  if(argsObject) {
    var keys = Object.keys(argsObject);
    keys.forEach(function(key) {
      tmp[key] = argsObject[key];
    })
  }
  return tmp.evaluate().setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
}

