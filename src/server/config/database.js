'use strict';
var mongoose = require('mongoose');

module.exports = function(config){
	mongoose.connect(config.db);
	
	var db = mongoose.connection;
	db.on('error', console.error.bind(console, 'connection error:'));
	
};