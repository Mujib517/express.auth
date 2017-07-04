let express = require('express');
let hbs = require('express-hbs');
let passport = require('passport');
let session = require('express-session');
let bodyParser = require('body-parser');
let LocalStrategy = require('passport-local').Strategy;

let authService = require('./passport');
let middlewares = require('./middlewares');
let loginRouter = require('./loginRouter');
let taskRouter=require('./taskRouter');

let app = express();

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

app.use(loginRouter);

app.use(middlewares.isAuthenticated);
app.use(middlewares.noCache);

app.use(taskRouter);

app.listen(3000, function () {
    console.log('running on 3000');
});




