let express = require('express');
let hbs = require('express-hbs');
let passport = require('passport');
let session = require('express-session');
let bodyParser = require('body-parser');
let LocalStrategy = require('passport-local').Strategy;

let app = express();

app.set('view engine', 'hbs');
app.use(bodyParser.json());
app.use(express.static('public'));

app.use(session({
    secret: 'pwd',
    resave: true,
    saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());


app.engine('hbs', hbs.express4({
    defaultLayout: __dirname + '/views/layout/main.hbs',
    layoutDir: __dirname + '/views/layout'
}));


app.get('/', function (req, res) {
    res.render('pages/home');
});

app.get('/login', function (req, res) {
    res.render('pages/login');
});

app.post('/login', function (req, res) {
    passport.authenticate('local-login', function (err, user) {
        if (err) res.status(500).render('pages/home');
        else res.redirect('/tasks')
    });
});

passport.serializeUser(function (user, done) {
    done(null, user);
});

passport.deserializeUser(function (user, done) {
    done(null, user);
});

passport.use('local-login', new LocalStrategy({
    passReqToCallback: true
}, function (req, username, password, done) {
    if (req.username == "mujib" && req.password == "password") return done(null);
    else return done("invalid password try again");
}));

app.use(function (req, res, next) {
    if (req.isAuthenticated()) next();
    else res.redirect('/login');
})

app.get('/tasks', function (req, res) {
    res.render('tasks');
});


app.listen(3000, function () {
    console.log('running on 3000');
});
