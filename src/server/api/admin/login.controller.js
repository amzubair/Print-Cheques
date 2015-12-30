'use strict';
var mongoose = require('mongoose');
var jwt = require('jsonwebtoken');
var User = mongoose.model('User');
// var Cheque = require('./cheque.model');

var createToken = function (user, secret, expiry) {

    var token = jwt.sign({
        _id: user._id,
        name: user.firstName + ' ' + user.lastName,
        username: user.username,
    }, secret, {
            expiresIn: expiry
        });

    return token;
}

var loginController = function (config) {

    // Return Function Declarations
    return {
        authenticate: authenticate,
        me: me
    };

    function authenticate(req, res) {

        if (!req.body.username || !req.body.password) {
            res.status(400).send('Please provide a Username and Password');
        }

        User.findOne({ username: req.body.username }).select('password username firstName lastName').exec(function (err, user) {
            if (err) {
                res.status(201).send({ success: false, message: err });
                return;
            }

            if (user && user.authenticate(req.body.password)) {

                var token = createToken(user, config.secretKey, config.tokenExpiry);
                res.status(200).send({ success: true, message: "Successful Login", token: token });
            } else {
                res.status(201).send({ success: false, message: "Invalid Username or Password" });
            }
        });
    };


    function me(req, res) {
        jwt.verify(getTokenFromHeader(req.headers.authorization), config.secretKey, function (err, decoded) {
            if (err) {
                res.status(403).send({ success: false, message: "Failed to authenticate user" });
            } else {
                res.status(403).send({ success: true, message: "Decoded User Data", "payload": decoded });

            }
        });
    }

    function getTokenFromHeader(authHeader) {
        if (authHeader) {
            return authHeader.split(' ')[1];
        } 
    }
}

module.exports = loginController;
