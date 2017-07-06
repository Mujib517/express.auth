let express = require('express');
let hbs = require('express-hbs');
let passport = require('passport');
let session = require('express-session');
let bodyParser = require('body-parser');
let mongoose = require('mongoose');

let authService = require('./passport');
let middlewares = require('./middlewares');
let loginRouter = require('./loginRouter');
let taskRouter = require('./taskRouter');



let googleAuthConfig = require('./google.js');

let app = express();

mongoose.connect('mongodb://localhost/authDb');

app.set('view engine', 'hbs');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

let options = {
    secret: 'pwd',
    resave: true,
    saveUninitialized: true,
    maxAge: 60000
};

app.use(session(options));
app.use(passport.initialize());
app.use(passport.session());

app.engine('hbs', hbs.express4({
    defaultLayout: __dirname + '/views/layout/main.hbs',
    layoutDir: __dirname + '/views/layout'
}));

app.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

app.get('/auth/google/callback',
    passport.authenticate('google', {
        successRedirect: '/tasks',
        failureRedirect: '/'
    }));


app.use(loginRouter);

app.use(middlewares.isAuthenticated);
app.use(middlewares.noCache);

app.use(taskRouter);

app.listen(3000, function () {
    console.log('running on 3000');
});




