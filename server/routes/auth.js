const express = require('express')
const { log } = require('../../server')
const User = require('../models/User')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const isEmpty = require('lodash/isEmpty')
const router = express.Router()
const config = process.env.NODE_ENV === 'production' ? process.env.JWT_SECRET : require('../../config').jwtSecret

/**
 * Authenticates a login request.
 * If a username or email matches a user, the password
 * offered is compared with the user's salted password.
 * If the passwords match, a JSON web token is created
 * and returned.
 */
router.post('/', (req, res) => {
  const { identifier, password } = req.body

  User.find({ $or: [{ username: identifier }, { email: identifier }] })
  .exec()
  .then(user => {
    user = user[0]
    if (!isEmpty(user)) {
      if (bcrypt.compareSync(password, user.passwordDigest)) {
        const token = jwt.sign({
          id: user._id,
          username: user.username
        }, config)
        return res.json({ token })
      } else {
        return res.status(202).json({
          errors: { form: 'Invalid Credentials' }
        })
      }
    } else {
      return res.status(202).json({
        errors: { form: 'Invalid Credentials' }
      })
    }
  })
  .catch(err => {
    log.error('Mongoose: auth request promise rejected', { err }, { req }, { mongoose: true })
    return res.status(500).json({ 'error querying database for user login': err })
  })
})

/**
 * Returns a client's IP address
 */
router.get('/ip', (req, res) => {
  const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress
  log.info('auth.js: IP address returned:', { ip })
  return res.json({ clientIp: ip })
})

module.exports = router
