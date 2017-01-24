// Dependencies.
var rmdir = require('rmdir');
var Promise = require('promise');
var jsonfile = require('jsonfile');
var _ = require('lodash');
var async = require('async');
var needle = require('needle');
var cheerio = require('cheerio');
var url = require('url');
var fs = require('fs');
var path = require('path');

// Models.
var ProductModel = require('../Models/Product');

// Enums.
var Error = require('../Enums/Error');
var ProductStatus = require('../Enums/Status');

function extract(id) {
    return new Promise(function (resolve, reject) {
        // Create folder.
        fs.mkdirSync(path.join('./tmp/html', id.toString()));

        var q = async.queue(function (task, callback) {

            needle.get(task.url, function (err, res) {
                if (err) reject(err);

                var $ = cheerio.load(res.body);

                if ($('.product').length) {
                    // Create file.
                    fs.writeFileSync(path.join('./tmp/html', id.toString(), task.count.toString()), res.body);

                    if ($('.arrow-next').length) {
                        q.push({
                            url: url.resolve(task.url, $('.arrow-next > a').attr('href')),
                            count: ++task.count
                        });
                    }
                } else {
                    // Remove directory.
                    rmdir(path.join('./tmp/html', id.toString()));

                    // Reject promise.
                    reject(Error.DOES_NOT_EXIST);

                    // Kill drain callback.
                    q.kill();
                }

                callback();
            });

        });

        // Push the first job and initialize queue.
        q.push({
            url: url.resolve('http://www.ceneo.pl/', id.toString()),
            count: 1
        });

        // Callback that fires when all the jobs in queue finish.
        q.drain = function () {
            ProductModel.create({
                productId: id,
                productStatus: ProductStatus.EXTRACTED
            }, function (err, product) {
                resolve(id);
            });
        };
    });
}

function transform(id) {
    return new Promise(function (resolve, reject) {
        fs.readdir(path.join('./tmp/html', id.toString()), function (err, files) {
            if (err) throw err;

            var queue = [];

            files.forEach(function (file) {
                queue.push(function (cb) {
                    fs.readFile(path.join('./tmp/html', id.toString(), file), function (err, data) {
                        if (err) throw err;

                        var $ = cheerio.load(data, {
                            ignoreWhitespace: true,
                            xmlMode: true
                        });

                        var reviews = [];

                        $('.product-review', '.product-reviews').each(function (i, elem) {
                            reviews[i] = {
                                // Here should be all the information about the review.
                                productReviewer: $(elem).find('.product-reviewer').text(),
                                reviewerRecommendation: $(elem).find('.product-review-summary').text(),
                                // ... go on, Daniel
                            }
                        });

                        cb(null, {
                            // Here should be all the information about the product.
                            productName: $('.product-name', '.product-content').text(),
                            productScore: $('.product-score', '.product-content').attr('content'),
                            productPrice: $('.price', '.offer-summary').text(),
                            // ... go on, Daniel
                            reviews: reviews
                        })
                    })
                })
            });

            async.parallel(queue, function (err, result) {
                // Merge all the reviews into one array.
                var reviews = _.flattenDeep(result.map(function (file) {
                    return file.reviews;
                }));

                // Merge product's details with all the reviews.
                var data = _.assign({}, result[0], {reviews: reviews});

                // Save our .json.
                jsonfile.writeFile(path.join('./tmp/json', id + '.json'), data, {spaces: 2}, function (err) {
                    if (err) reject(err);

                    console.log(2);

                    resolve(id);
                });
            });
        })
    });
}

function load(id) {
    return new Promise(function (resolve, reject) {
        // Read .json.
        jsonfile.readFile(path.join('./tmp/json', id + '.json'), function (err, obj) {
            // Update project's document in DB.
            ProductModel.findOneAndUpdate({productId: id}, {productDetails: obj}, function (err, product) {
                if (err) reject(err);

                // todo: wht? It does not fire!
                // resolve(product);
            });

            // todo: resolve it here, but it is a wrong way. We should resolve it in the findOneAndUpdate callback!
            resolve(id);
        })
    });
}

function etl(id) {
    return new Promise(function (resolve, reject) {
        // Chain function.
        extract(id).then(transform).then(load)
            .then(function (result) {
                resolve(result);
            })
            .catch(function (err) {
                reject(err);
            });
    });

}

function destroy(id) {
    return new Promise(function (resolve, reject) {
        ProductModel.findOneAndRemove({productId: id}, function(err, product) {
            if (err) reject(err);

            // Remove directory.
            rmdir(path.join('./tmp/html', id.toString()));
            // Remove JSON.
            fs.unlinkSync(path.join('./tmp/json', id + '.json'));

            resolve();
        });
    });
}

module.exports = {
    extract: extract,
    transform: transform,
    load: load,
    etl: etl,
    destroy: destroy
};
