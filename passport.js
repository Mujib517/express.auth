let passport = require('passport');
let LocalStrategy = require('passport-local').Strategy;

function authService() {

    passport.serializeUser(function (user, done) {
        done(null, user);
    });

    passport.deserializeUser(function (user, done) {
        done(null, user);
    });

    passport.use('login', new LocalStrategy(
        function (username, password, done) {
            if (username === "mujib" && password === "password")
                return done(null, { username: "mujib" });
            return done("Failed");
        }));

    return {
        authenticate: passport.authenticate('login', {
            successRedirect: '/tasks',
            failureRedirect: '/',
        })
    }
}

module.exports = authService;
