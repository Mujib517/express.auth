
let GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
let passport = require('passport');
let config = require('./config');


// passport.serializeUser(function (user, done) {
//     done(null, user);
// });

// passport.deserializeUser(function (id, done) {
//     done(null, id);
// });

passport.use(new GoogleStrategy(config, function (token, refreshToken, profile, done) {
    process.nextTick(function () {
        let user = { username: profile.emails[0].value, token: token, id: profile.id, name: profile.displayName };
        done(null, user);
    });
}));

