const express = require('express')
const User = require('../models/User')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const config = require('../config')
const isEmpty = require('lodash/isEmpty')

let router = express.Router()

/**
 * Authenicates a login request.
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
        }, config.jwtSecret)
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
    console.log('ERROR: promise rejected', err)
    return res.status(500).json({ 'error querying database for user login': err })
  })
})

module.exports = router
