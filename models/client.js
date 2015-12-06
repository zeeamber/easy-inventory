var mongoose = require('mongoose');
var crypto = require('crypto');

var client_schema = new mongoose.Schema({
    name : {type : String, required : true},
    clientId : {type : String, unique : true, required : true},
    clientSecret : String
});

client_schema.methods.set_clientSecret = function() {
    var salt = crypto.randomBytes(16).toString('hex');
    this.clientSecret = crypto.pbkdf2Sync(this.clientId, salt, 1000, 16).toString('hex');
};

mongoose.model('client', client_schema);