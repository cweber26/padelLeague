var Route = {};
Route.path = function (route, callback) {
    Route[route] = callback;
};

var param = {isAdmin: false};

// noinspection JSUnusedGlobalSymbols
function doGet(e) {
    param = e.parameters;

    Route.path("profil", loadProfil);
    Route.path("inscription", loadInscription);
    Route.path("confirmation", loadConfirmation);
    Route.path("compo", loadCompo);
    Route.path("stat", loadStat);
    Route.path("record", loadRecord);
    Route.path("error", loadError);

    if (!isValidUser(param)) {
        return loadInvalidUser();
    } else if (Route[param.page]) {
        return Route[param.page]();
    } else {
        return loadCompo();
    }
}