var initFacebook        = require('./init-facebook.js'),
    initGoogle          = require('./init-google.js'),
    User                = require('../models/user.js');

module.exports = function(passport) {
    passport.serializeUser(function(user, done) {
        done(null, user._id);
    });

    passport.deserializeUser(function(id, done) {
        User.findById(id, function(err, user) {
            done(err, user);
        });
    });

    initFacebook(passport);
    initGoogle(passport);
};