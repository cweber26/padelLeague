function loadError() {
    return render("front/html/error", "error", {mail: param.mail, key: param.key, admin: param.isAdmin});
}