var express = require('express');

var chequeController = require('./cheque.controller');

var router = function () {

	var chequeRouter = express.Router();

	chequeRouter.route('/')
		.get(chequeController.getCheques);
		
	return chequeRouter;

};


module.exports = router;