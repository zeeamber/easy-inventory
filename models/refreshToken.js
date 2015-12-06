var mongoose = require('mongoose');

var refreshToken_schema = new mongoose.Schema({
    userId : { type : String, required : true },
    clientId : { type : String, required : true },
    token : { type : String, unique : true, required : true },
    created : { type : Date, default : Date.now }
});

mongoose.model('refreshToken', refreshToken_schema);