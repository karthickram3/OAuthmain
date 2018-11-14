const express = require("express")
const app = express()
const authRoutes = require("./routes/auth-routes")
const profileRoutes = require("./routes/profile-routes")
const passportSetup = require("./config/passport-setup") //mandatory to run google strategy
const mongoose = require("mongoose")
const keys = require("./config/keys")
const cookieSession = require("cookie-session")
const passport = require("passport")


//setup view engine
app.set("view engine", "ejs")

//manage cooie session  
app.use(cookieSession({
    maxAge: 24 * 60 * 60 * 1000,
    keys: [keys.session.key]
}))
app.use(passport.initialize())
app.use(passport.session())


//connect to mongoose
mongoose.connect(keys.mongodb.dbURI, function () {
    console.log("Connected to MongoDb")
})

//create home route
app.get("/", function (req, res) {
    res.render("home", { details: req.user })

})

//setup routes
app.use("/auth", authRoutes)
app.use("/profile", profileRoutes)

app.listen(3000, function () {
    console.log("App listening at Port 3000")
})