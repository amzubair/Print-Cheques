'use strict'
var express = require('express');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var cors = require('cors');

module.exports = function (app, config) {
    
    // Logging request details
    app.use(morgan('dev'));
	
    // Express Middleware Configurations
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());
    app.use(cors());
    
    // Express Application Setup
    console.log('environment: ' + process.env.NODE_ENV);
    switch (process.env.NODE_ENV) {

        case 'Production':
            console.log('** PRODUCTION **');
            app.use(express.static('./build/'));
            break;

        default:
            console.log('** DEVELOPMENT **');
            console.log(config.clientPath);
            app.use('/', express.static(config.clientPath));
            app.use('/bower_components', express.static('./bower_components'));
            //app.use('/.temp', express.static('/.temp'));
            break;
    }


}