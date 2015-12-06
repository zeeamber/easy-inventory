var oauth2orize = require('oauth2orize');
var passport = require('passport');
var crypto = require('crypto');

var mongoose = require('mongoose');
var User = mongoose.model('user');
var AccessToken = mongoose.model('accessToken');
var RefreshToken = mongoose.model('refreshToken');

var authServer = oauth2orize.createServer();

var errHandlerFn = function(cb, err) {
    if(err) { return cb(err); }
};

var generateTokens = function(data, done) {
    var errorHandler = errHandlerFn.bind(undefined, done);
    var refreshToken;
    var refreshTokenValue;
    var token;
    var tokenValue;
    
    RefreshToken.remove(data, errorHandler);
    AccessToken.remove(data, errorHandler);
    tokenValue = crypto.randomBytes(32).toString('hex');
    refreshTokenValue = crypto.randomBytes(32).toString('hex');
    
    data.token = tokenValue;
    token = new AccessToken(data);
     
    data.token = refreshTokenValue;
    refreshToken = new RefreshToken(data);
    
    refreshToken.save(errorHandler);
    
    token.save(function(err) {
        if(err) { return done(err); }
        done(null, tokenValue, refreshTokenValue, {'expires-in' : 3600});
    });
};

authServer.exchange(oauth2orize.exchange.password(function(client, username, password, scope, done) {
    User.findOne({username : username}, function(err, user) {
        if(err) { return done(err); }
        if(!user || !user.valid_password(password)) { return done(null, false); }
        var userObj = {userId : user.username, clientId : client.clientId};
        generateTokens(userObj, done);
    });
}));

authServer.exchange(oauth2orize.exchange.refreshToken(function(client, refreshToken, scope, done) {
    RefreshToken.findOne({token : refreshToken, clientId : client.clientId}, function(err, token) {
        if(err) { return done(err); }
        if(!token) { return done(null, false); }
        User.findOne({username : token.userId}, function(err, user) {
            if(err) { return done(err); }
            if(!user) { return done(null, false); }
            var userObj = {userId : user.username, clientId : client.clientId};
            generateTokens(userObj, done);
        });
    });
}));

exports.token = [passport.authenticate(['basic', 'oauth2-client-password'], {session : false}), authServer.token(), authServer.errorHandler()];