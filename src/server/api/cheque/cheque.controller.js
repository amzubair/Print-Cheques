'use strict';

var Cheque = require('./cheque.model');

var chequeController = function () {
	
	// Return Function Declarations
	
	return {
		getCheques: getCheques,
		
	};

	function getCheques(req, res) {
		Cheque.find().exec(function (err, doc) {
			if (err)
				res.status(500).send(err);
			else
				res.status(200).send(doc);
		});
	}

	
};

// Exports

module.exports = chequeController();