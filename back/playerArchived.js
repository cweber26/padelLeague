function loadPageDeletion() {
    return render("front/page/profilArchived", "suppression", {
        mail: param.mail,
        key: param.key,
        admin: param.isAdmin
    });
}