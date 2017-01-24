var ProductModel = require('../../Models/Product');
var ProductStatus = require('../../Enums/Status');
var ParserController = require('../../Controllers/ParserController');

function show(req, res) {
    var id = req.params.id;

    ProductModel.findOne({productId: id}, function(err, product) {
        if (err) {
            return res.status(400).json({
                err: err
            })
        }

        // 200 - ok.
        res.status(200).json({
            success: true,
            message: 'Product was successfully loaded!',
            product: product
        });
    });
}

function destroy(req, res) {
    var id = req.params.id;

    ParserController.destroy(id)
        .then(function() {
            // 200 - ok.
            res.status(200).json({
                success: true,
                message: 'Product was deleted successfully!'
            });
        })
        .catch(function(err) {
            res.status(400).json({
                success: false,
                err: err
            });
        });
}

function extract(req, res) {
    var id = req.body.id;

    ParserController.extract(id)
        .then(function() {
            res.status(200).json({
                success: true,
                message: 'Product was extracted successfully!'
            });
        })
        .catch(function(err) {
            res.status(400).json({
                success: false,
                err: err
            });
        });
}

function transform(req, res) {
    var id = req.body.id;

    ProductModel.findOneAndUpdate({productId: id}, {productStatus: ProductStatus.TRANSFORMED}, function(err, product) {
        if (err) {
            return res.status(400).json({
                err: err
            })
        }

        // 200 - ok.
        res.status(200).json({
            success: true,
            message: 'Product was transformed successfully!'
        });

        // Use controller.
        ParserController.transform(id);
    });
}

function load(req, res) {
    var id = req.body.id;

    ProductModel.findOneAndUpdate({productId: id}, {productStatus: ProductStatus.LOADED}, function(err, product) {
        if (err) {
            return res.status(400).json({
                err: err
            })
        }

        // 200 - ok.
        res.status(200).json({
            success: true,
            message: 'Product was loaded successfully!'
        });


        // Use controller.
        ParserController.load(id);
    });
}

function etl(req, res) {
    var id = req.body.id;

    ParserController.etl(id)
        .then(function() {
            res.status(200).json({
                success: true,
                message: 'Product was successfully ETLed!'
            });
        })
        .catch(function(err) {
            res.status(400).json({
                success: false,
                err: err
            });
        });
}

module.exports = {
    show: show,
    destroy: destroy,
    extract: extract,
    transform: transform,
    load: load,
    etl: etl
};
