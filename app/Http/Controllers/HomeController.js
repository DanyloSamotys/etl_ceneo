var path = require('path');

function index(req, res) {
    res.render('pages/index');
}

module.exports = {
    index: index
};
