var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var User = mongoose.model('user');

/* Register a new user */
router.post('/register', function(req, res, next) {
    if(!req.body.username || !req.body.password) {
        return res.json({status : 400, message : 'provide username and password'});
    }
    
    var user = new User();
    user.username = req.body.username;
    user.set_password(req.body.password);
    
    user.save(function(err) {
        if(err) { return next(err); }
        res.json({status : 200, message : 'new user registered successsfuly'});
    });
});

module.exports = router;
