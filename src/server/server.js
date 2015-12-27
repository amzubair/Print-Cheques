var express = require('express');
var bodyParser = require('body-parser');
var morgan = require('morgan');
var moment = require('moment');
var app = express();


// Port Settings
var env = process.env.NODE_ENV = process.env.NODE_ENV || 'Development';

var config = require('./config/config')[env];

// Logging request details
app.use(morgan('dev'));

// Express Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Express Application Setup
console.log('environment: ' + process.env.NODE_ENV);
switch (process.env.NODE_ENV) {
    case 'production':
        console.log('** PRODUCTION **');
        app.use(express.static('./build/'));

        break;

    default:
        console.log('** DEVELOPMENT **');
        console.log(config.clientPath);
        app.use('/', express.static(config.clientPath));
        app.use('/bower_components', express.static('./bower_components'));
        app.use('/.temp', express.static('/.temp'));



        break;
}

// Database Configurations
require('./config/database')(config);

require('./api/routes')(app, config);

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
