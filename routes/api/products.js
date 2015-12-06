var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var Product = mongoose.model('product');

var passport = require('passport');
var auth = passport.authenticate('bearer', {session : false});

router.use(function(req, res, next) {
    var token = req.body.accessToken;
    req.headers['authorization'] = 'Bearer ' + token;
    return next();
});

/* Map URL param product */
router.param('product', function(req, res, next, id) {
    var query = Product.findById(id);
    query.exec(function(err, product) {
        if(err) { return next(err); }
        if(!product) { return next(new Error('can not find product')); }
        
        req.product = product;
        return next();
    });
});

/* GET products listing. */
router.get('/', auth, function(req, res, next) {
  Product.find(function(err, products) {
        if(err) {return next(err);}
        res.json({status : 200, message : 'success', data : products});
    });
});

/* Search for products */
router.get('/search', auth, function(req, res, next) {
    console.log('searching');
    Product.find({ $text: {$search:req.body.searchString} }).exec(function(err, products) {
        if(err) { console.log('ZEESHAN ERROR');return next(err); }
        res.json({status : 200, message : 'success', data : products});
    });
});

/* GET a single product */
router.get('/:product', auth, function(req, res, next) {
    res.json({status : 200, message : 'success', data : req.product});
});

/* Add a new product */
router.post('/', auth, function(req, res, next) {
    if(!req.body.title || !req.body.description || !req.body.price || !req.body.quantity) {
        return resjson({status : 400, message : 'bad request', data : null});
    }
    var product = new Product(req.body);
    product.save(function(err, product) {
        if(err) { return next(err); }
        res.json({status : 200, message : 'success', data : product});
    });
});

/* Delete a product */
router.delete('/:product', auth, function(req, res, next) {
    req.product.remove(function(err, product) {
        if(err) { return next(err); }
        res.json({status : 200, message : 'success', data : product});
    });
});

/* Update a product */
router.put('/:product', auth, function(req, res, next) {
    req.product.update(req.body, function(err, product) {
        if(err) { return next(err); }
        res.json({status : 200, message : 'success', data : product});
    });
});

module.exports = router;
