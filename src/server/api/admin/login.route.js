var express = require('express');


var router = function (config) {

    var loginController = require('./login.controller')(config);

    var loginRouter = express.Router();

    loginRouter.route('/login')
        .post(loginController.authenticate);
        
    loginRouter.route('/me')
        .get(loginController.me);

    return loginRouter;

};


module.exports = router;