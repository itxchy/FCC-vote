'use strict';

var express = require('express');
var commonValidations = require('./shared/signupValidation.js');
var bcrypt = require('bcrypt');
var isEmpty = require('lodash/isEmpty');

var User = require('../models/User');

var router = express.Router();

function validateInput(data, otherValidations) {
  var _otherValidations = otherValidations(data),
      errors = _otherValidations.errors;

  // checks if the submitted email or username is already taken


  return User.find({ $or: [{ email: data.email }, { username: data.username }] }).exec().then(function (user) {
    if (user.username === data.username) {
      errors.username = 'This username is taken.';
    }
    if (user.email === data.email) {
      errors.email = 'This email is already registered';
    }
    return {
      errors: errors,
      isValid: isEmpty(errors)
    };
  }).catch(function (err) {
    console.error('ERROR: user validation promise rejected', err);
    return Promise.reject(err);
  });
}

/**
 * Looks up a user based on username or email
 * If no user is found, the response will be null
 */
router.get('/:identifier', function (req, res) {
  User.find({ $or: [{ email: req.params.identifier }, { username: req.params.identifier }] }).select('username email').exec().then(function (user) {
    console.log('user found!', user);
    if (isEmpty(user)) {
      return res.json({ user: null });
    }
    return res.json({ user: user });
  }).catch(function (err) {
    console.log('find user promise rejection');
    res.status(400).json({ 'user lookup error': err, error: err });
  });
});

/**
 * Creates a new user and saves the credentials
 * to the User table, if they pass validation
 */
router.post('/', function (req, res) {
  validateInput(req.body, commonValidations).then(function (results) {
    console.log('results object should contain isValid and errors', results);
    if (results.isValid) {
      var _req$body = req.body,
          username = _req$body.username,
          password = _req$body.password,
          email = _req$body.email;

      var passwordDigest = bcrypt.hashSync(password, 10);
      var user = new User();
      user.username = username;
      user.email = email;
      user.passwordDigest = passwordDigest;

      user.save().then(function (user) {
        res.json({ success: 'signup successful!', user: user });
      }).catch(function (err) {
        res.status(500).json({ 'save user error': err });
      });
    } else {
      res.status(400).json({ 'user input validation error': results.errors });
    }
  }).catch(function (err) {
    return res.status(500).json({ 'validate user input error': err });
  });
});

module.exports = router;