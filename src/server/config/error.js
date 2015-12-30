'use strict';
module.exports = function (app, config) {
    // Routes: Error Pages
	
    app.use(function (err, req, res, next) {
        if (err.name === 'UnauthorizedError') {
            res.status(401).send('Unauthorized');
        }
    });
	
    // 404 Not Found Error Page
    app.use('/api/*', function (req, res, next) {
        res.status(404).send('404: Not Found');
    });

 
    // 500 Server Error Page
    app.use(function (req, res, next) {
        res.status(500);
        res.sendFile(config.clientPath + '500.html');
    });


};