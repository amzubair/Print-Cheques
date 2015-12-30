var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');


var Schema = mongoose.Schema;

// User Schema Definition

var UserSchema = new Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    username: { type: String, required: true, index: { unique: true } },
    salt: { type: String, select: true },
    password: { type: String, required: true, select: true },
    email: { type: String, required: true },
    role: { type: String, default: 'user' },
    createdOn: { type: Date, default: Date.now }
});

UserSchema.pre('save', function (next) {
    var user = this;

    if (!user.isModified('password')) return next();
    bcrypt.genSalt(10, function (err, salt) {
        if (err) return next(err);

        bcrypt.hash(user.password, salt, null, function (err, hash) {
            if (err) return next(err);
            user.salt = salt;
            user.password = hash;
            next();
        })
    })
});

// METHODS

UserSchema.methods = {

    hideUserPassword: function () {
        var user = this.toObject();
        delete user.password;
        delete user.salt;
        return user;
    },
    
    // Authenticates the user by checking the hashed password with the 
    // hased password in the database
    authenticate: function (passwordToMatch) {
        var user = this;
        return bcrypt.compareSync(passwordToMatch, user.password);
    },
	
};

// Exports

module.exports = mongoose.model('User', UserSchema);


