var mongoose = require('mongoose');
var crypto = require('crypto');

var user_schema = new mongoose.Schema({
    username : {type : String, lowercase : true, unique: true},
    hash : String,
    salt : String
});

user_schema.methods.set_password = function(password) {
    this.salt = crypto.randomBytes(16).toString('hex');
    this.hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64).toString('hex');
};

user_schema.methods.valid_password = function(password) {
    var hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64).toString('hex');
    return this.hash === hash;
};

mongoose.model('user', user_schema);