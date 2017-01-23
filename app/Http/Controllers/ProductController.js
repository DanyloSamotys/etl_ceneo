var ProductModel = require('../../Models/Product');
var ProductStatus = require('../../Enums/Status');
var ParserController = require('../../Controllers/ParserController');

function show(req, res) {
    var productId = req.params.id;

    ProductModel.findOne({productId: productId}, function(err, product) {
        if (err) {
            return res.status(400).json({
                err: err
            })
        }

        // 200 - ok.
        res.status(200).json(product);
    });
}

function extract(req, res) {
    var productId = req.body.id;

    ProductModel.create({
        productId: productId,
        productStatus: ProductStatus.EXTRACTED
    }, function(err, product) {
        if (err) {
            return res.status(400).json({
                err: err
            })
        }

        // 200 - ok.
        res.status(200).json(product);

        // Use controller.
        ParserController.extract(product);
    });
}

function transform(req, res) {
    var productId = req.body.id;

    ProductModel.findOneAndUpdate({productId: productId}, {productStatus: ProductStatus.TRANSFORMED}, function(err, product) {
        if (err) {
            return res.status(400).json({
                err: err
            })
        }

        // 200 - ok.
        res.status(200).json(product);

        // Use controller.
        ParserController.transform(product);
    });
}

function load(req, res) {
    var productId = req.body.id;

    ProductModel.findOneAndUpdate({productId: productId}, {productStatus: ProductStatus.LOADED}, function(err, product) {
        if (err) {
            return res.status(400).json({
                err: err
            })
        }

        // 200 - ok.
        res.status(200).json(product);

        // Use controller.
        ParserController.load(product);
    });
}

function etl(req, res) {

}

module.exports = {
    extract: extract,
    transform: transform,
    load: load,
    etl: etl,
    show: show
};
