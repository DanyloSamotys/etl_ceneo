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
    },
    productDetails: Schema.Types.Mixed
});

module.exports = mongoose.model('Product', Product);
