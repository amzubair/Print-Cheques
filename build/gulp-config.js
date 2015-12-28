'use strict'

module.exports = function () {
	var server = './src/server/';

	var config = {
		defaultPort: 7203,
		paths: {
			nodeServer: './src/server/server.js',
			server: server,
			api: server + 'api/',
			models: server + 'api/models.js'
		}
	};

	return config;
} ();
