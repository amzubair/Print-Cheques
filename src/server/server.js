var express = require('express');
var bodyParser = require('body-parser');
var morgan = require('morgan');
var moment = require('moment');
var app = express();


// Port Settings
var env = process.env.NODE_ENV = process.env.NODE_ENV || 'Development';

var config = require('./config/config')[env];

// Initialize Models
require('./api/models');

// Logging request details
app.use(morgan('dev'));

// Express Middleware
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());



// Database Configurations
require('./config/database')(config);

require('./api/routes')(app, config);

app.listen(config.port, function () {
	process.startTime = moment().format('HH:MM:SS');
	process.startDate = moment().format('DD/MM/YYYY');
	console.log('-----------------------------------------------------')
	console.log('Status      : Application Started' );
	console.log('Environment : ' + env);
	console.log('Port        : ' + config.port);
	console.log('Database    : ' + config.db);
	console.log('Start Date  : ' + process.startDate);
	console.log('Start Time  : ' + process.startTime);
	console.log('-----------------------------------------------------')
});
