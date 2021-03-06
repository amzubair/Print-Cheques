var express = require('express');
var bodyParser = require('body-parser');
var moment = require('moment');
var app = express();


// Port Settings
var env = process.env.NODE_ENV = process.env.NODE_ENV || 'Development';

// Application Configuration
var config = require('./config/config')[env];

// Initialize Models
require('./api/models');

// Database Configurations
require('./config/database')(config);

// Express Application Configuration
require('./config/express')(app, config);

// Routes
require('./api/routes')(app, config);

// Error Routes
require('./config/error')(app, config);

app.listen(config.port, function () {
    process.startTime = moment().format('HH:MM:SS');
    process.startDate = moment().format('DD/MM/YYYY');
    console.log('-----------------------------------------------------')
    console.log('      Status: Application Started');
    console.log(' Environment: ' + env);
    console.log('        Port: ' + config.port);
    console.log('    Database: ' + config.db);
    console.log('  Start Date: ' + process.startDate);
    console.log('  Start Time: ' + process.startTime);
    console.log('-----------------------------------------------------')
});
