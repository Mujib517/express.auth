let express = require('express');
let passport = require('passport');
let bodyParser = require('body-parser');
let LocalStrategy = require('passport-local').Strategy;
var session = require("express-session");


let app = express();

app.use(bodyParser.json());

app.listen(3000, function () {
    console.log('server running on 3000');
});

app.get('/', function (req, res) {
    res.status(200);
    res.send("Api is healthy");
});

/*passport stuff*/

app.use(session({
    secret: 'pwd',
    resave: true,
    saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());



passport.serializeUser(function (user, done) {
    console.log('serizliaing', user);
    done(null, user.id);
});

passport.deserializeUser(function (id, done) {
    console.log('deserializing', id);
    done(null, id);
});


app.get('/login', function (req, res) {
    res.send("failed");
});


app.post('/login', passport.authenticate('local-signin', {
    successRedirect: '/profile', // redirect to the secure profile section
    failureRedirect: '/login', // redirect back to the signup page if there is an error
}));

passport.use('local-signin', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
},
    function (req, email, password, done) {
        let user = {
            id: 1,
            email: 'mujib'
        };

        console.log('logging in');

        if (email === "mujib" && password === "password") return done(null, {
            id: 1,
            email: 'mujib'
        });
        else return done("Failed");
    }));



function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) next();
    else res.status(401).send("Unauthorized");
}

app.use(isLoggedIn);


app.get('/profile', function (req, res) {
    console.log(req);
    res.send("loggined");
});


