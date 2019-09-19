var Route = {};
Route.path = function (route, callback) {
    Route[route] = callback;
};

var param = {isAdmin: false};

// noinspection JSUnusedGlobalSymbols
function doGet(e) {
    param = e.parameters;

    Route.path("profil", loadPageProfil);
    Route.path("inscription", loadPageInscription);
    Route.path("confirmation", loadPageConfirmation);
    Route.path("compo", loadPageCompo);
    Route.path("stat", loadPageStat);
    Route.path("record", loadPageRecord);
    Route.path("error", loadPageError);
    Route.path("backoffice", loadPageBackoffice);
    Route.path("team", loadPageTeam);
    Route.path("resultat", loadPageResultat);

    if (!isValidUser(param)) {
        return loadPageInvalidUser();
    } else if (Route[param.page]) {
        return Route[param.page]();
    } else {
        return loadPageCompo();
    }
}