var mongoose = require('mongoose');

var product_schema =  new mongoose.Schema({
    title : String,
    description : String,
    price : Number,
    quantity : Number
});

product_schema.index({ title:'text', description:'text' });

product_schema.methods.update = function(product, cb) {
    if(product.title) {
        this.title = product.title;
    }
    if(product.description) {
        this.description = product.description;
    }
    if(product.price) {
        this.price = product.price;
    }
    if(product.quantity) {
        this.quantity = product.quantity;
    }  
    this.save(cb);
};

mongoose.model('product', product_schema);