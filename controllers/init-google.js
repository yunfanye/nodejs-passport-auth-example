var googleConfig        = require('../configurations/google.js'),
    User                = require('../models/user.js');
    GoogleStrategy      = require('passport-google-oauth20').Strategy;

module.exports = function(passport) {
    passport.use(new GoogleStrategy({
            clientID: googleConfig.clientId,
            clientSecret: googleConfig.clientSecret,
            callbackURL: googleConfig.callbackUrl,
            passReqToCallback: true
        },
        function(request, accessToken, refreshToken, profile, cb) {
            process.nextTick(function() {
                // Normalize profile
                profile.googleId = profile.id;
                if(!request.user) {
                    // User not logged in
                    User.findOne({googleId: profile.id}, function (err, user) {
                        if (err) {
                            return cb(err);
                        }
                        else if (user) {
                            return cb(null, user);
                        }
                        else {
                            var newUser = new User();
                            newUser.fillMissingData(profile, cb);
                        }
                    });
                }
                else {
                    request.user.fillMissingData(profile, cb);
                }
            });
        }
    ));
};