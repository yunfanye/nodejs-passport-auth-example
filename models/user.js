var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
    displayName: String,
    email: String,
    fbId: String,
    googleId: String
});

UserSchema.methods.fillMissingData = function fillMissingData (profile, cb) {
    var user = this;
    user.displayName = user.displayName || profile.displayName;
    user.email = user.email || profile.email;
    user.fbId = user.fbId || profile.fbId;
    user.googleId = user.googleId || profile.googleId;
    user.save(function (err) {
        if (err) {
            throw err;
        }
        else {
            return cb(null, user);
        }
    });
};

module.exports = mongoose.model('User', UserSchema);