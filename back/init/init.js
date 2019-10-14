////////////SHEET////////////
var spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
var sheetTeam = spreadsheet.getSheetByName("Team");
var sheetInscription = spreadsheet.getSheetByName("Inscription");
var sheetSchedule = spreadsheet.getSheetByName("Schedule");
var sheetParameters = spreadsheet.getSheetByName("Parameters");

////////////PARAMETERS INIT////////////
var parametersMap = loadParametersMap();

function loadParametersMap() {
    var parametersMap = new Map();
    sheetParameters.getRange(1,1).getDataRegion().getValues().forEach(function(p) {
        parametersMap.set(p[0],p[1]);
    });
    return parametersMap;
}

function reloadParametersMap() {
    parametersMap = loadParametersMap();
}