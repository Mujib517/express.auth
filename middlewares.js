module.exports = {
    isAuthenticated: function (req, res, next) {
        if (req.isAuthenticated()) next();
        else res.redirect('/login');
    },

    noCache: function noCache(req, res, next) {
        res.header("Cache-Control", "no-cache, no-store, must-revalidate");
        next();
    }
} 