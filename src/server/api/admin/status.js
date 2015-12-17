var express = require('express');
var prettyMs = require('pretty-ms');


var router = function (config) {

	var adminRouter = express.Router();

	adminRouter.route('/status')
		.get(function (req, res) {
			res.json({
				'Status': 'Application Running',
				'Environment': process.env.NODE_ENV,
				'Port': process.env.PORT,
				'Database': config.db,
				'Start Date': process.startDate,
				'Start Time': process.startTime,
				'Server Elapsed Time': prettyMs(process.uptime() * 1000)
			});
		});
		
	adminRouter.route('/config')
		.get(function(req, res){
			res.json(config);
		});

	return adminRouter;

};


module.exports = router;