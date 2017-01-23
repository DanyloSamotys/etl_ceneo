var ProductModel = require('../../Models/Product');

module.exports = function(req, res, next) {
    var productId = req.body.id;

    ProductModel.findOne({productId: productId}, function(err, product) {
        if (err) {
            return res.status(400).json({
                err: err
            })
        }

        if (product) {
            next();
        } else {
            // 400 - bad request.
            res.status(400).json({
                success: false,
                error: 'Product with ' + productId + ' does not exist!'
            });
        }
    });
}
