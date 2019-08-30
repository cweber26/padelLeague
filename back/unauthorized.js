
function loadPageUnauthorized() {
    return render("front/html/unauthorized", {mail: param.mail, key: param.key});
}
