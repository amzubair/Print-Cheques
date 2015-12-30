module.exports = {
	
	// Global settings for 
	// development environment 
	Development: {
		env: 'Development',
		db: 'mongodb://localhost/test',
		port: process.env.PORT || 3010,
        clientPath: './src/client/web/',
        secretKey: '$2a$10$EGQW5wR7mYhtrzucsD9gs.vhoVfYpbw02se7itNG8VTbc//b2EApK',
        tokenExpiry: "1d"
	},
	
	// Global settings for 
	// production environment
	Production: {
		// db: 'mongodb://amzubair:2rcaz0q7@ds035583.mongolab.com:35583/sakfarm',
		env: 'Production',
		port: process.env.PORT || 80,

	}
};