'use strict';
var mongoose = require('mongoose');
var User = mongoose.model('User');
// var Cheque = require('./cheque.model');

var signupController = function () {
	
    // Return Function Declarations
	
    return {
        createUser: createUser,
        getUsers: getUsers
    };

    function createUser(req, res) {
        var user = new User(req.body);

        user.save(function (err, user) {
            if (err) {
                res.status(500).send({ success: false, 'message': 'Error: ' + err });
                return;
            }
            
            res.status(201).send({ sucess: true, 'message': 'User Created', doc: user.hideUserPassword() });
        });

    }

    function getUsers(req, res) {
        User.find({}, function (err, users) {
            if (err) {
                res.status(500).send({ success: false, 'message': 'Error: ' + err });
                return;
            }

            res.status(201).send({ success: true, doc: users });
        })
    }


}

module.exports = signupController();
