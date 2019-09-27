function loadPageBackoffice() {
    var player = getPlayerWithMail(param.mail);
    if (!param.isAdmin) {
        return loadPageUnauthorized();
    }

    var parameterApplication = {};
    parameterApplication.victory = parametersMap.get("victoryPoint");
    parameterApplication.draw = parametersMap.get("drawPoint");
    parameterApplication.defeat = parametersMap.get("defeatPoint");
    parameterApplication.offensiveBonus = parametersMap.get("offensiveBonusPoint");
    parameterApplication.minGoalGap = parametersMap.get("minGoalOffensiveBonus");
    parameterApplication.deffensiveBonus = parametersMap.get("defensiveBonusPoint");
    parameterApplication.maxGoalGap = parametersMap.get("maxGoalDefensiveBonus");
    parameterApplication.minMatch = parametersMap.get("minMatchForStat");
    parameterApplication.nbPlayersMatch = parametersMap.get("numberPlayerMatch");
    parameterApplication.nbLimitPlayers = parametersMap.get("minPlayerForAutoCancelation");
    parameterApplication.modeTest = isParameterTrue("modeTest");
    parameterApplication.mailTester = parametersMap.get("mailTester");
    parameterApplication.applicationName = parametersMap.get("applicationName");

    var log = {};
    log.send1 = getDateTimeFormat(parametersMap.get("mailSendingPrio1"));
    log.send2 = getDateTimeFormat(parametersMap.get("mailSendingPrio2"));
    log.send3 = getDateTimeFormat(parametersMap.get("mailSendingPrio3"));
    log.control = getDateTimeFormat(parametersMap.get("controlDone"));
    log.reminder = getDateTimeFormat(parametersMap.get("mailSendingReminder"));
    log.googleEvent = getDateTimeFormat(parametersMap.get("creationGoogleEvent"));
    log.confirmation = getDateTimeFormat(parametersMap.get("mailSendingConfirmation"));
    log.team = getDateTimeFormat(parametersMap.get("teamSaved"));

    var schedule = "";
    sheetSchedule.getRange(2, 1, 1, 8).getValues().forEach(function (s) {
        schedule += "<tr>"
            + "<td>" + s[0] + "</td>"
            + "<td>" + checkbox(s[1]) + "</td>"
            + "<td>" + checkbox(s[2]) + "</td>"
            + "<td>" + checkbox(s[3]) + "</td>"
            + "<td>" + checkbox(s[4]) + "</td>"
            + "<td>" + checkbox(s[5]) + "</td>"
            + "<td>" + checkbox(s[6]) + "</td>"
            + "<td>" + checkbox(s[7]) + "</td>"
            + "</tr>";
    });
    sheetSchedule.getRange(3, 1, 12, 8).getValues().forEach(function (s) {
        schedule += "<tr>"
            + "<td>" + s[0] + "</td>"
            + "<td>" + s[1] + "</td>"
            + "<td>" + s[2] + "</td>"
            + "<td>" + s[3] + "</td>"
            + "<td>" + s[4] + "</td>"
            + "<td>" + s[5] + "</td>"
            + "<td>" + s[6] + "</td>"
            + "<td>" + s[7] + "</td>"
            + "</tr>";
    });

    return render("front/page/backoffice", "Barbeuc : BackOffice", {
        mail: param.mail,
        key: param.key,
        admin: param.isAdmin,
        player: player,
        param: parameterApplication,
        log: log,
        schedule: schedule,
        testing: isParameterTrue("modeTest")
    });
}

// noinspection JSUnusedGlobalSymbols
function updateParameter(parameterApplication) {
    updateParameterValue("victoryPoint", parameterApplication.victory);
    updateParameterValue("drawPoint",parameterApplication.draw);
    updateParameterValue("defeatPoint",parameterApplication.defeat);
    updateParameterValue("offensiveBonusPoint",parameterApplication.offensiveBonus);
    updateParameterValue("minGoalOffensiveBonus",parameterApplication.offensiveBonusGap);
    updateParameterValue("defensiveBonusPoint",parameterApplication.defensiveBonus);
    updateParameterValue("maxGoalDefensiveBonus",parameterApplication.defensiveBonusGap);
    updateParameterValue("minMatchForStat",parameterApplication.minMatch);
    updateParameterValue("numberPlayerMatch",parameterApplication.nbPlayersMatch);
    updateParameterValue("minPlayerForAutoCancelation",parameterApplication.nbLimitPlayers);
    if (parameterApplication.modeTest) {
        updateParameterValue("modeTest",true);
    } else {
        updateParameterValue("modeTest",false);
    }
    updateParameterValue("mailTester",parameterApplication.mailTester);
    updateParameterValue("applicationName",parameterApplication.applicationName);
}

// noinspection JSUnusedGlobalSymbols
function switchMode() {
    if(isParameterTrue("modeTest")) {
        updateParameterValue("modeTest",false);
    } else {
        updateParameterValue("modeTest",true);
    }
}
