var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var path = require('path');
var http = require('http');
var server = http.Server(app);
var io = require('socket.io')(server);
var mongoose = require('mongoose');

// Connect to DB.
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://turakvlad:turakvlad@ds127389.mlab.com:27389/ceneo-project');

// Middlewares.
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use('/assets', express.static(path.join(__dirname, 'public')));

// Sepficy template engine.
app.set('view engine', 'ejs');

// Routing.
app.use('/', require('./routes/home'));
app.use('/api/v1/', require('./routes/product'));

// Listen server.
server.listen(3001);

// Error handling.
app.use(function (err, request, response, next) {
    response.status(500).send('Something broke!');
});
