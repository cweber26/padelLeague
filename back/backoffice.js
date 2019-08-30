function loadPageBackoffice() {
    var player = getPlayerWithMail(param.mail);
    if (!param.isAdmin) {
        return loadPageUnauthorized();
    }

    var parameterApplication = {};
    parameterApplication.victory = rangePointForVictory.getValue();
    parameterApplication.draw = rangePointForDraw.getValue();
    parameterApplication.defeat = rangePointForDefeat.getValue();
    parameterApplication.offensiveBonus = rangePointForOffensiveBonus.getValue();
    parameterApplication.minGoalGap = rangeMinGoalGapForOffensiveBonus.getValue();
    parameterApplication.deffensiveBonus = rangePointForDefensiveBonuse.getValue();
    parameterApplication.maxGoalGap = rangeMaxGoalGapForDefensiveBonus.getValue();
    parameterApplication.minMatch = rangeMinMatchForStat.getValue();
    parameterApplication.nbLimitPlayers = nbLimitPlayers;
    parameterApplication.modeTest = modeTest;
    parameterApplication.mailTester = mailTester;

    var log = {};
    log.send1 = getDateTimeFormat(rangeSending1.getValue());
    log.send2 = getDateTimeFormat(rangeSending2.getValue());
    log.send3 = getDateTimeFormat(rangeSending3.getValue());
    log.control = getDateTimeFormat(rangeControl.getValue());
    log.reminder = getDateTimeFormat(rangeReminder.getValue());
    log.googleEvent = getDateTimeFormat(rangeGoogleEvent.getValue());
    log.confirmation = getDateTimeFormat(rangeConfirmation.getValue());


    return render("front/page/backoffice", "Barbeuc : BackOffice", {
        mail: param.mail,
        key: param.key,
        admin: param.isAdmin,
        player: player,
        param: parameterApplication,
        log: log,
        testing: rangeModeTest.getValue()
    });
}

// noinspection JSUnusedGlobalSymbols
function updateParameter(parameterApplication) {
    rangePointForVictory.setValue(parameterApplication.victory);
    rangePointForDraw.setValue(parameterApplication.draw);
    rangePointForDefeat.setValue(parameterApplication.defeat);
    rangePointForOffensiveBonus.setValue(parameterApplication.offensiveBonus);
    rangeMinGoalGapForOffensiveBonus.setValue(parameterApplication.offensiveBonusGap);
    rangePointForDefensiveBonuse.setValue(parameterApplication.defensiveBonus);
    rangeMaxGoalGapForDefensiveBonus.setValue(parameterApplication.defensiveBonusGap);
    rangeMinMatchForStat.setValue(parameterApplication.minMatch);
    rangeNbLimitPlayers.setValue(parameterApplication.nbLimitPlayers);
    if (modeTest) {
        rangeModeTest.setValue(true);
    } else {
        rangeModeTest.setValue(false);
    }
    rangeMailTester.setValue(parameterApplication.mailTester);
}
