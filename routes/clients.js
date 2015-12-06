var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var Client = mongoose.model('client');

/* Register a new user */
router.post('/register', function(req, res, next) {
    if(!req.body.name || !req.body.clientId) {
        return res.json({status : 400, message : 'provide name and clientId'});
    }
    
    var client = new Client();
    client.name = req.body.name;
    client.clientId = req.body.clientId;
    client.set_clientSecret();
    
    client.save(function(err) {
        if(err) { return next(err); }
        res.json({status : 200, message : 'new client registered successsfuly', data : {clientId : client.clientId, clientSecret : client.clientSecret}});
    });
});

module.exports = router;