const passport = require("passport")
const GoogleStrategy = require("passport-google-oauth20")
const keys = require("./keys")
const User = require("../models/user-model")


passport.serializeUser((user, done) => {
    done(null, user.id)
})

passport.deserializeUser((id, done) => {
    User.findById(id).then(function (user) {
        done(null, user)
    })
})

passport.use(
    new GoogleStrategy({
        //option for google strat
        callbackURL: "/auth/google/redirect",
        clientID: keys.google.clientID,
        clientSecret: keys.google.clientSecret

    }, function (accessToken, refreshToken, profile, done) {
        console.log("logging using google+++++++++++")
        //check if user already exists in our db
        User.findOne({ googleId: profile.id }).then(function (currentUser) {
            if (currentUser) {
                //already have the User
                console.log("user is " + currentUser)
                done(null, currentUser)

            } else {
                //if not create new User
                new User({
                    userName: profile.displayName,
                    googleId: profile.id
                }).save().then(function (newUser) {
                    console.log("newUser created" + newUser)
                    done(null, newUser)
                })
            }

        })

    })
)





