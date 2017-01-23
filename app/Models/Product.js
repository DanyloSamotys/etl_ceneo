var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Product = new Schema({
    productId: {
        type: Number,
        required: true,
        index: true,
        unique: true
    },
    productStatus: {
        type: Number,
        default: null
    }
});

module.exports = mongoose.model('Product', Product);
