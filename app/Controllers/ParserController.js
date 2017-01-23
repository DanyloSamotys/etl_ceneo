var tress = require('tress');
var needle = require('needle');
var cheerio = require('cheerio');
var resolve = require('url').resolve;
var fs = require('fs');

function extract(product) {
    fs.mkdirSync('./products/html/product-' + product.productId);

    var q = tress(function (page, callback) {

        needle.get(page.url, function (err, res) {
            if (err) throw err;

            var $ = cheerio.load(res.body);

            if ($('.product').length) {
                fs.writeFileSync('./products/html/product-' + product.productId + '/page-' + page.count + '.html', $.html());

                if ($('.arrow-next').length) {
                    q.push({
                        url: resolve(page.url, $('.arrow-next > a').attr('href')),
                        count: ++page.count
                    });
                }
            }

            callback();
        });

    });

    // Push the first job and initialize queue.
    q.push({
        url: 'http://www.ceneo.pl/' + product.productId,
        count: 1
    });

    // Callback that fires when all the jobs in queue finish.
    q.drain = function() {
      console.log('Finish!');
    };
}

function transform() {

}

function load() {

}

function etl() {

}

module.exports = {
    extract: extract,
    transform: transform,
    load: load,
    etl: etl
};
