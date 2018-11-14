const router = require("express").Router()

const authCheck = (req, res, next) => {
    if (!req.user) {
        //if user not logged in
        res.redirect("/auth/login")
    } else {
        //if logged in
        next();
    }

}

router.get("/", authCheck, function (req, res) {
    res.render("profile", { details: req.user })
})

module.exports = router