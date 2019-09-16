////////////SHEET////////////
var spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
var sheetTeam = spreadsheet.getSheetByName("Team");
var sheetInscription = spreadsheet.getSheetByName("Inscription");
var sheetInscriptionFilter = spreadsheet.getSheetByName("InscriptionFilter");
var sheetResult = spreadsheet.getSheetByName("Result");
var sheetResultFilter = spreadsheet.getSheetByName("ResultFilter");
var sheetRecordFilter = spreadsheet.getSheetByName("RecordFilter");
var sheetComposition = spreadsheet.getSheetByName("Composition");
var sheetStats = spreadsheet.getSheetByName("Stats");
var sheetParameters = spreadsheet.getSheetByName("Parameters");
var sheetSchedule = spreadsheet.getSheetByName("Schedule");

////////////PARAMETERS INIT////////////
var parametersMap = loadParametersMap();

function loadParametersMap() {
    var parametersMap = new Map();
    sheetParameters.getRange(1,1).getDataRegion().getValues().forEach(function(p) {
        parametersMap.set(p[0],p[1]);
    });
    return parametersMap;
}