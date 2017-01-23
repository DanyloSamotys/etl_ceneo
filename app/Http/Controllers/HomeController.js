var path = require('path');

function index(req, res) {
    res.sendFile(path.join(__dirname, '../../../public', 'index.html'));
}

module.exports = {
    index: index
};
