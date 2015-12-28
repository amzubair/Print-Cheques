'use strict';
var mongoose = require('mongoose');
var Cheque = mongoose.model('Cheque');
// var Cheque = require('./cheque.model');

var chequeController = function () {
	
	// Return Function Declarations
	
	return {
		getCheques: getCheques,
		getChequeById: getChequeById,
		createCheque: createCheque,
		removeCheque: removeCheque
	};

	function getCheques(req, res) {
		Cheque.find().exec(function (err, doc) {
			if (err)
				res.status(500).send(err);
			else
				res.status(200).send(doc);
		});
	}
	
	function getChequeById(req, res) {
		Cheque.findById(req.params.id).exec(function (err, doc) {
			if (err)
				res.status(500).send(err);
			else
				res.status(200).send(doc);
		});
		
	}
	
	function createCheque(req, res) {
		var cheque = new Cheque(req.body);

		cheque.save(function (err, result) {
			if (err)
				res.status(500).send({ 'message': 'Error: ' + err });
			else
				res.status(201).send({ 'message': 'Cheque Created', doc: result });
		});

	}
	
	function removeCheque(req, res) {
		Cheque.remove({ _id: req.params.id }).exec(function (err, cheque) {
			if (err)
				res.status(500).send(err);
			else
				res.status(204).send({ message: 'Cheque successfully deleted.' });
		});
	}
	

	
};

// Exports

module.exports = chequeController();