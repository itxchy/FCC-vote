'use strict';

var express = require('express');

var _require = require('../../server'),
    log = _require.log;

var User = require('../models/User');
var bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
var isEmpty = require('lodash/isEmpty');
var router = express.Router();
var config = process.env.NODE_ENV === 'production' ? process.env.JWT_SECRET : require('../../config').jwtSecret;

/**
 * Authenticates a login request.
 * If a username or email matches a user, the password
 * offered is compared with the user's salted password.
 * If the passwords match, a JSON web token is created
 * and returned.
 */
router.post('/', function (req, res) {
  var _req$body = req.body,
      identifier = _req$body.identifier,
      password = _req$body.password;


  User.find({ $or: [{ username: identifier }, { email: identifier }] }).exec().then(function (user) {
    user = user[0];
    if (!isEmpty(user)) {
      if (bcrypt.compareSync(password, user.passwordDigest)) {
        var token = jwt.sign({
          id: user._id,
          username: user.username
        }, config);
        return res.json({ token: token });
      } else {
        return res.status(202).json({
          errors: { form: 'Invalid Credentials' }
        });
      }
    } else {
      return res.status(202).json({
        errors: { form: 'Invalid Credentials' }
      });
    }
  }).catch(function (err) {
    log.error('Mongoose: auth request promise rejected', { err: err }, { req: req }, { mongoose: true });
    return res.status(500).json({ 'error querying database for user login': err });
  });
});

/**
 * Returns a client's IP address
 */
router.get('/ip', function (req, res) {
  var ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
  log.info('auth.js: IP address returned:', { ip: ip });
  return res.json({ clientIp: ip });
});

module.exports = router;