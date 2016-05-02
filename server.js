'use strict';

require('babel-register');

var path = require('path');
var bodyParser = require('body-parser');
var express = require('express');
var compression = require('compression');
var config = require('./config');
var logger = require('morgan');

var serverResource = {
  start: function() {
    var serverInstance = null;
    var server = express();
    server.set('port', config.server.port);
    server.use(compression());
    server.use(logger('dev'));
    server.use(bodyParser.json());
    server.use(bodyParser.urlencoded({ extended: false }));
    server.use(express.static(path.join(__dirname, config.server.baseDir)));
    // set cors headers for all requests
    server.all('*', function (req, res, next) {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "X-Requested-With, Content-Type, X-XSRF-TOKEN");
        res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
        next();
    });
    serverInstance = server.listen(config.server.port, function(){
        console.log('Start listening on port ' + config.server.port);
    });  
  }
};
module.exports = serverResource;
