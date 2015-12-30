var prettyMs = require('pretty-ms');
var moment = require('moment');

module.exports = function (app, config) {



    // API Routes
    app.use('/api', require('./admin/status')(config));
    app.use('/api', require('./admin/signup.route.js')());
    app.use('/api', require('./admin/login.route.js')(config));
    app.use('/api/cheques', require('./cheque/cheque.route')());

};
