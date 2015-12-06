var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var passport = require('passport');

//DB setup
var mongoose = require('mongoose');
require('./models/product');
require('./models/user');
require('./models/client');
require('./models/accessToken');
require('./models/refreshToken');
//require('./config/passport');
mongoose.connect('mongodb://localhost/easy-inventory');

var routes = require('./routes/index');
var users = require('./routes/users');
var clients = require('./routes/clients');
var product_apis = require('./routes/api/products');

var oauth2 = require('./auth/oauth2');
require('./auth/auth');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(passport.initialize());

app.use('/', routes);
app.use('/clients', clients);
app.use('/users', users);
app.use('/oauth/token', oauth2.token);
app.use('/api/products', product_apis);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
