const express = require('express');
const passport = require('passport');
const authService = require('./passport')();

let loginRouter = express.Router();

loginRouter.get('/', function (req, res) {
    res.render('pages/home');
});

loginRouter.get('/login', function (req, res) {
    res.render('pages/login');
});

loginRouter.get('/logout', function (req, res) {
    req.logout();
    res.redirect('/login');
});

loginRouter.post('/login', authService.authenticate);

module.exports = loginRouter;