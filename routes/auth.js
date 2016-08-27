var express             = require('express');
    passport            = require('passport');
    facebookConfig      = require('../configurations/facebook.js');

var router = express.Router();

// Route for facebook authentication
router.get('/facebook',
    passport.authenticate('facebook', { scope : ['email'] })
);

// Handles the callback after facebook has authenticated the user
router.get('/facebook/callback',
    passport.authenticate('facebook', {failureRedirect : '/auth'}),
    function(request, response) {
        response.redirect('/');
    }
);

// Route for Google authentication
router.get('/google',
    passport.authenticate('google', { scope: ['profile'] }));

// Handles the callback after Google has authenticated the user
router.get('/google/callback',
    passport.authenticate('google', { failureRedirect: '/auth' }),
    function(request, response) {
        response.redirect('/');
    }
);

module.exports = router;