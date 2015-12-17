var express = require('express');
var moment = require('moment');
var app = express();


// Port Settings
var env = process.env.NODE_ENV = process.env.NODE_ENV || 'Development';

var config = require('./config/config')[env];

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
