var Route = {};
Route.path = function (route, callback) {
    Route[route] = callback;
};

// noinspection JSUnusedGlobalSymbols
function doGet(e) {
    param = e.parameters;

    Route.path("inscription", loadPageInscription);
    Route.path("compo", loadPageCompo);


    if (Route[param.page]) {
        return Route[param.page]();
    } x
}