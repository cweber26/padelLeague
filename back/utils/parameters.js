
function updateParameterValue(name, value) {
    Logger.log("updateParameterValue name %s and value %s", name, value);
    getRangeParameter(name).setValue(value);
    parametersMap = loadParametersMap();
}

function clearParameterValue(name) {
    Logger.log("clearParameterValue name %s", name);
    getRangeParameter(name).clearContent();
    parametersMap = loadParametersMap();
}

function getRangeParameter(name) {
    return sheetParameters.getRange(getRowParameter(name), 2);
}

function getRowParameter(name) {
    var parametersValues = sheetParameters.getRange(1,1).getDataRegion().getValues();
    for (var i=0; i <parametersValues.length; i++) {
        if(parametersValues[i][0]==name) {
           return i+1;
        }
    }
}

function isParameterBlank(name) {
  if(parametersMap.get(name)){
    return parametersMap.get(name)=="";
  } else {
    return true;
  }
}

function isParameterNotBlank(name) {
  if(parametersMap.get(name)){
    return parametersMap.get(name)!="";
  } else {
    return false;
  }
}

function isParameterTrue(name) {
    return parametersMap.get(name)==true;
}

function isParameterFalse(name) {
    return parametersMap.get(name)==false;
}