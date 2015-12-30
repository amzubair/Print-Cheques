var express = require('express');

var signupController = require('./signup.controller');

var router = function () {

	var signupRouter = express.Router();

	signupRouter.route('/signup')
	    .get(signupController.getUsers)
		.post(signupController.createUser);

	return signupRouter;

};


module.exports = router;