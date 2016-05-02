'use strict';

require('babel-register');

var bodyParser = require('body-parser');
var express = require('express');
var mongoose = require('mongoose');
var OrderResource = require('./app/order/order.resource');
var config = require('./config');

var serverResource = {
  start: function() {
    var serverInstance = null;
    var server = express();
    server.use(bodyParser.json());
    server.use(bodyParser.urlencoded({ extended: false }));
    // set cors headers for all requests
    server.all('*', function (req, res, next) {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "X-Requested-With, Content-Type, X-XSRF-TOKEN");
        res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
        next();
    });
    // Order Resource is created where all the REST URL mapping is done
    var resource = new OrderResource();
    resource.configure(server);
    serverInstance = server.listen(config.server.port, function(){
        console.log('Start listening on port ' + config.server.port);
        mongoose.connect(config.mongo.database);
        mongoose.connection.on('connected', function () {  
          console.log('Mongoose default connection open to ' + config.mongo.database);
        }); 

        // When the connection is disconnected
        mongoose.connection.on('disconnected', function () {  
          console.log('Mongoose default connection disconnected'); 
        });

        // If the Node process ends, close the Mongoose connection 
        process.on('SIGINT', function() {  
          mongoose.connection.close(function () { 
            console.log('Mongoose default connection disconnected through app termination'); 
            process.exit(0); 
          }); 
        }); 

        mongoose.connection.on('error', function() {
          console.info('Error: Could not connect to MongoDB. Did you forget to run `mongod`?'.red);
        });
    });  
  }

};
module.exports = serverResource;
