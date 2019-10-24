////////////SHEET////////////
var spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
var sheetTeam = spreadsheet.getSheetByName("Team");
var sheetInscription = spreadsheet.getSheetByName("Inscription");
var sheetSchedule = spreadsheet.getSheetByName("Schedule");
var sheetParameters = spreadsheet.getSheetByName("Parameters");

////////////PARAMETERS INIT////////////
var playersTeamList = sheetTeam.getRange(2, 1, sheetTeam.getLastRow()-1, sheetTeam.getLastColumn()).getValues();
var parametersList = sheetParameters.getRange(1,1).getDataRegion().getValues();
var mail1 = getParameterFromList("mail1");
var mail2 = getParameterFromList("mail2");
var creationGoogleEvent = getParameterFromList("creationGoogleEvent");
var mailReminder = getParameterFromList("mailReminder");
var cleaning = getParameterFromList("cleaning");
var nextMatchDate = getParameterFromList("nextMatchDate");
var numberOfField = getParameterFromList("numberOfField");
var numberAvailableSlotInMatch = getParameterFromList("numberAvailableSlotInMatch");
var numberPlayerInMatch = getParameterFromList("numberPlayerInMatch");
var numberPlayerInWaitingList = getParameterFromList("numberPlayerInWaitingList");
var matchPlayerMailList = getParameterFromList("matchPlayerMailList");
var waitingListPlayerMailList = getParameterFromList("waitingListPlayerMailList");
var notAvailablePlayerMailList = getParameterFromList("notAvailablePlayerMailList");
var notRespondedPlayerMailList = getParameterFromList("notRespondedPlayerMailList");
var modeTest = getParameterFromList("modeTest");
var mailTester = getParameterFromList("mailTester");
var applicationName = getParameterFromList("applicationName");
var numberPlayerMatch = getParameterFromList("numberPlayerMatch");
var adminMailList = getParameterFromList("adminMailList");

function getRowParameter(name) {
    if(name) {
        for (var i=0; i <parametersList.length; i++) {
            if(parametersList[i][0]==name) {
                return i+1;
            }
        }
    }
}

function getParameterFromList(name) {
    return parametersList[getRowParameter(name)-1][1];
}

function clearParameter(name) {
    sheetParameters.getRange(getRowParameter(name), 2).clearContent();
}

function updateParameter(name, value) {
    sheetParameters.getRange(getRowParameter(name), 2).setValue(value);
}
