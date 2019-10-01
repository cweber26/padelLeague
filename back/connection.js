
function loadPageConnection() {
    return render("front/page/connection", "Connexion",{
        mail: null,
        key: null,
        admin: false,
        testing: isParameterTrue("modeTest")
    });
}
