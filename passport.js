let passport = require('passport');
let LocalStrategy = require('passport-local').Strategy;
let User = require('./models/user');

function authService() {

    passport.serializeUser(function (user, done) {
        done(null, user);
    });

    passport.deserializeUser(function (user, done) {
        done(null, user);
    });

    passport.use('login', new LocalStrategy(
        function (username, password, done) {
            User.findOne({ "username": username, 'password': password }, { 'username': 1, '_id': 1 }, function (err, user) {
                if (err) done(err);
                else done(null, user);
            });
        }));

    return {
        authenticate: passport.authenticate('login', {
            successRedirect: '/tasks',
            failureRedirect: '/',
        })
    }
}

module.exports = authService;
