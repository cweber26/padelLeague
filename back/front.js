var Route = {};
Route.path = function (route, callback) {
    Route[route] = callback;
};

var param;

// noinspection JSUnusedGlobalSymbols
function doGet(e) {
    param = e.parameters;

    Route.path("inscription", loadPageInscription);
    Route.path("compo", loadPageCompo);

    Logger.log("Page to load : " + param.page + " for mail " + param.mail);

    if (Route[param.page]) {
        return Route[param.page]();
    }
}