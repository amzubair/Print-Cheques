'use strict'

module.exports = function(){
	var config = {
		defaultPort: 7203, 
		nodeServer: './src/server/server.js',
		server: './src/server/'
	};
	
	return config;
}();