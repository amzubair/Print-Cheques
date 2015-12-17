var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ChequeSchema = new Schema({
		number: {type: Number},
		bankName: {type: String}, 
		date: {type: Date, default: Date.now},
		payee: {type: String},
		amount: {type: Number, default: 0},
		amountInWords: {type: String},
		createdOn: {type:Date, default: Date.now}
});

module.exports = mongoose.model('Cheque', ChequeSchema);


