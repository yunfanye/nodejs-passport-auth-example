var facebookConfig      = require('../configurations/facebook.js'),
    User                = require('../models/user.js');
    FacebookStrategy    = require('passport-facebook').Strategy;

module.exports = function(passport) {
    passport.use(new FacebookStrategy({
            clientID: facebookConfig.appId,
            clientSecret: facebookConfig.appSecret,
            callbackURL: facebookConfig.callbackUrl,
            passReqToCallback: true
        },
        function(request, accessToken, refreshToken, profile, cb) {
            process.nextTick(function() {
                // Normalize profile
                profile.fbId = profile.id;
                profile.displayName = profile.displayName || profile.username;
                if(!request.user) {
                    // User not logged in
                    User.findOne({fbId: profile.id}, function (err, user) {
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