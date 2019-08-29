////////////SHEET////////////
var sheetTeam = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Team");
var sheetBackOffice = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("BackOffice");
var sheetInscription = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Inscription");
var sheetResult = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Result");
var sheetResultFilter = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("ResultFilter");
var sheetRecordFilter = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("RecordFilter");
var sheetComposition = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Composition");
var sheetStats = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Stats");

////////////RANGE & VALUES////////////
var columnParam = 2;
var firstRowParam = 11;
var applicationName = sheetBackOffice.getRange(firstRowParam, columnParam).getValue();
var nbMaxPlayers = sheetBackOffice.getRange(firstRowParam + 1, columnParam).getValue();
var nbLimitPlayers = sheetBackOffice.getRange(firstRowParam + 2, columnParam).getValue();
var rangeCancelMatch = sheetBackOffice.getRange(firstRowParam + 3, columnParam);
var nbPlayersAvailable = sheetBackOffice.getRange(firstRowParam + 4, columnParam).getValue();
var nbAvailableSlots = sheetBackOffice.getRange(firstRowParam + 5, columnParam).getValue();
var nbPlayersWaiting = sheetBackOffice.getRange(firstRowParam + 6, columnParam).getValue();
var rangeNextGameDate = sheetBackOffice.getRange(firstRowParam + 7, columnParam);
var nextMatchDayFrench = sheetBackOffice.getRange(firstRowParam + 8, columnParam).getValue();
var mailsAdmin = sheetBackOffice.getRange(firstRowParam + 9, columnParam).getValue();
var playersInTheMatchMails = sheetBackOffice.getRange(firstRowParam + 10, columnParam).getValue();
var playersLastMonthMails = sheetBackOffice.getRange(firstRowParam + 12, columnParam).getValue();

var firstRowStadium = 25;
var stadiumName = sheetBackOffice.getRange(firstRowStadium, columnParam).getValue();
var address = sheetBackOffice.getRange(firstRowStadium + 1, columnParam).getValue();
var urlAddress = sheetBackOffice.getRange(firstRowStadium + 2, columnParam).getValue();
var costMatch = sheetBackOffice.getRange(firstRowStadium + 3, columnParam).getValue();
var reservationName = sheetBackOffice.getRange(firstRowStadium + 4, columnParam).getValue();
var beginGameHour = sheetBackOffice.getRange(firstRowStadium + 5, columnParam).getValue();
var infoGame = sheetBackOffice.getRange(firstRowStadium + 6, columnParam).getValue();

var firstRowTest = 32;
var modeTest = sheetBackOffice.getRange(firstRowTest, columnParam).getValue();
var mailTester = sheetBackOffice.getRange(firstRowTest + 1, columnParam).getValue();

var firstRowLogDate = 34;
var rangeSending1 = sheetBackOffice.getRange(firstRowLogDate, columnParam);
var rangeSending2 = sheetBackOffice.getRange(firstRowLogDate + 1, columnParam);
var rangeSending3 = sheetBackOffice.getRange(firstRowLogDate + 2, columnParam);
var rangeControl = sheetBackOffice.getRange(firstRowLogDate + 3, columnParam);
var rangeReminder = sheetBackOffice.getRange(firstRowLogDate + 4, columnParam);
var rangeGoogleEvent = sheetBackOffice.getRange(firstRowLogDate + 5, columnParam);
var rangeConfirmation = sheetBackOffice.getRange(firstRowLogDate + 6, columnParam);

var rangeCompoUpdated = sheetComposition.getRange(13, 2, nbMaxPlayers, 1);

var firstRowMatch = 41;
var rangeMatchDate = sheetBackOffice.getRange(firstRowMatch, columnParam);
var rangeMatchCompo = sheetBackOffice.getRange(firstRowMatch + 1, columnParam, nbMaxPlayers, 1);
var rangeScoreRed = sheetBackOffice.getRange(firstRowMatch + 11, columnParam);
var rangeScoreBlue = sheetBackOffice.getRange(firstRowMatch + 12, columnParam);

////////////PLAYER LIST////////////
function playersInTheMatchMail() {
    if (nbPlayersAvailable > 0) {
        return sheetBackOffice.getRange(2, 3, nbPlayersAvailable, 1).getValues();
    }
}

function playersInWaitingListMail() {
    if (nbPlayersWaiting > 0) {
        return sheetBackOffice.getRange(12, 3, nbPlayersWaiting, 1).getValues();
    }
}

function playersInTheMatchForFinalCompo() {
    if (nbPlayersAvailable > 0) {
        return sheetComposition.getRange(13, 2, nbMaxPlayers, 11).getValues();
    }
}