function playersTeamMailList() {
    return sheetTeam.getRange(3, 1, sheetTeam.getRange("A3:A").getValues().filter(String).length, 1).getValues()
}

function playersTeamList() {
    return sheetTeam.getRange(3, 1, sheetTeam.getRange("A3:A").getValues().filter(String).length, sheetTeam.getLastColumn()).getValues()
}

function shouldReceiveInscriptionMail(player, prior) {
    if (player.mail
        && player.prioValue <= prior
        && player.haveAlreadyAnswer == false
        && player.isUnavailable == false
        && haveSelectedMatchDay(player, nextMatchDay)) {
        return true;
    }
}


function getPlayerWithMail(mail) {
    var teamList = playersTeamList();
    for (var i = 0; i < teamList.length; i++) {
        if (teamList[i][0] == mail) {
            var playerLine = sheetTeam.getRange(i + 3, 1, 1, sheetTeam.getLastColumn()).getValues()[0];
            return initPlayer(playerLine);
        }
    }
}

function initPlayer(playerLine) {
    return {
        mail: playerLine[0],
        key: playerLine[1],
        keyWithSecurity: (playerLine[1] * 2 + 10),
        firstName: playerLine[2],
        lastName: playerLine[3],
        fullName: playerLine[4],
        shortfullName: playerLine[5],
        nickName: playerLine[6],
        isUnavailable: playerLine[7],
        endDateOfUnavailibility: playerLine[8],
        mondaySelected: playerLine[9],
        tuesdaySelected: playerLine[10],
        wednesdaySelected: playerLine[11],
        thursdaySelected: playerLine[12],
        fridaySelected: playerLine[13],
        site: playerLine[14],
        position: playerLine[15],
        levelDribble: playerLine[16],
        levelFrappe: playerLine[17],
        levelDefense: playerLine[18],
        haveDoneAutoEvaluation: playerLine[19],
        haveAlreadyAnswer: playerLine[20],
        prioValue: playerLine[21],
        isAdmin: playerLine[22],
        isPrioritary: playerLine[23]
    };
}

function isValidUser(param) {
    var player = getPlayerWithMail(param.mail);
    if (player) {
        if (isKeyValid(param.key, player.key)) {
            if (player.isAdmin) {
                param.isAdmin = true;
            }
            return true;
        }
    }
    return false;
}


function deleteUnavaibility() {
    var playersList = playersTeamList();
    for (var i in playersList) {
        var player = playersList[i];
        if (player.endDateOfUnavailibility) {
            if (player.endDateOfUnavailibility.valueOf() < nextMatchDate.valueOf()) {
                sheetTeam.getRange(Number(i) + 3, 8).setValue(false);
                sheetTeam.getRange(Number(i) + 3, 9).clearContent();
            }
        }
    }
}


function getNewPlayerInCompo() {
    var mail = playersInTheMatchMail()[9];
    return getPlayerWithMail(mail);
}


function loadPageProfil() {
    var player = getPlayerWithMail(param.mail);
    var mailList = {};
    if (param.isAdmin) {
        mailList = playersTeamMailList();
    }
    return render("front/page/profil", "Barbeuc : Profil", {
        mail: param.mail,
        key: param.key,
        player: player,
        admin: param.isAdmin,
        mailList: mailList,
        testing: rangeModeTest.getValue()
    });
}

// noinspection JSUnusedGlobalSymbols
function updateProfil(user) {

    var row = getRowSheetTeamWithMail(user.mail);

    if (user.key == (sheetTeam.getRange(row, 2).getValue() * 2 + 10)) {
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

        var oldFirstName = sheetTeam.getRange(row, 3).getValue();
        var oldLastName = sheetTeam.getRange(row, 4).getValue();
        if (oldFirstName != firstName || oldLastName != lastName) {
            updateNameProfil(oldFirstName, firstName, oldLastName, lastName, row);
        }

        if (nickName) {
            sheetTeam.getRange(row, 7).setValue(nickName)
        }
        if (unavailable) {
            sheetTeam.getRange(row, 8).setValue(true);
            sheetTeam.getRange(row, 9).setValue(new Date(Utilities.formatDate(endDate, "Europe/Paris", "MM/dd/yy")));
        } else {
            sheetTeam.getRange(row, 8).setValue(false);
            sheetTeam.getRange(row, 9).setValue("");
        }
        if (monday) {
            sheetTeam.getRange(row, 10).setValue(true);
        } else {
            sheetTeam.getRange(row, 10).setValue(false);
        }
        if (tuesday) {
            sheetTeam.getRange(row, 11).setValue(true);
        } else {
            sheetTeam.getRange(row, 11).setValue(false);
        }
        if (wednesday) {
            sheetTeam.getRange(row, 12).setValue(true);
        } else {
            sheetTeam.getRange(row, 12).setValue(false);
        }
        if (thursday) {
            sheetTeam.getRange(row, 13).setValue(true);
        } else {
            sheetTeam.getRange(row, 13).setValue(false);
        }
        if (friday) {
            sheetTeam.getRange(row, 14).setValue(true);
        } else {
            sheetTeam.getRange(row, 14).setValue(false);
        }
        if (site) {
            sheetTeam.getRange(row, 15).setValue(site);
        }
        if (position) {
            sheetTeam.getRange(row, 16).setValue(position);
        }
        if (levelDribble) {
            sheetTeam.getRange(row, 17).setValue(levelDribble);
        }
        if (levelFrappe) {
            sheetTeam.getRange(row, 18).setValue(levelFrappe);
        }
        if (levelDefense) {
            sheetTeam.getRange(row, 19).setValue(levelDefense);
        }
        if (levelDribble && levelFrappe && levelDefense) {
            sheetTeam.getRange(row, 20).setValue(true);
        }
    } else {
        throw "clef non valide";
    }
}

function getRowSheetTeamWithMail(mail) {
    var teamList = playersTeamList();
    for (var i = 0; i < teamList.length; i++) {
        if (teamList[i][0] == mail) {
            return i + 3;
        }
    }
}


// met à jour le nom complet modifié dans la page des résultats afin que les stats fonctionnent toujours
function updateNameProfil(oldFirstName, firstName, oldLastName, lastName, row) {
    if (firstName != oldFirstName) {
        sheetTeam.getRange(row, 3).setValue(firstName);
    } else {
        firstName = oldFirstName;
    }
    if (lastName != oldLastName) {
        sheetTeam.getRange(row, 4).setValue(lastName);
    } else {
        lastName = oldLastName;
    }
    var oldFullName = oldFirstName + " " + oldLastName;
    var newFullName = firstName + " " + lastName;
    var rangeResult = sheetResult.getRange(4, 2, sheetResult.getLastRow(), 13);
    var resultValues = rangeResult.getValues();
    replaceInSheet(resultValues, oldFullName, newFullName);
    rangeResult.setValues(resultValues);
}

function replaceInSheet(values, to_replace, replace_with) {
    var replaced_values;
    for (var row in values) {
        replaced_values = values[row].map(function (original_value) {
            return original_value.toString().replace(to_replace, replace_with);
        });
        values[row] = replaced_values;
    }
}