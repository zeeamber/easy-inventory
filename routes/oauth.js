var express = require('express');
var router = express.Router();

var oauth2 = require(process.cwd() + '/auth/oauth2');

router.post('/token', oauth2.token);

module.exports = router;