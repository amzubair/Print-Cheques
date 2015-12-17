var express = require('express');

var chequeController = require('./cheque.controller');

var router = function () {

	var chequeRouter = express.Router();

	chequeRouter.route('/')
		.get(chequeController.getCheques)
		.post(chequeController.createCheque);

	chequeRouter.route('/:id')
		.get(chequeController.getChequeById)
		.delete(chequeController.removeCheque);

	return chequeRouter;

};


module.exports = router;