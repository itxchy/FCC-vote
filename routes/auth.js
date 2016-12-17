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
    console.log('user object:', user)
    if (!isEmpty(user)) {
      console.log('if user true:', user)
      console.log({password: password, passwordDigest: user.passwordDigest})
      if (bcrypt.compareSync(password, user.passwordDigest)) {
        console.log('passwords match:', user.passwordDigest)
        const token = jwt.sign({
          id: user._id,
          username: user.username
        }, config.jwtSecret)
        return res.json({ token })
      } else {
        console.log('passwords do not match')
        return res.status(401).json({
          errors: { form: 'Invalid Credentials' }
        })
      }
    } else {
      console.log('no user object')
      return res.status(401).json({
        errors: { form: 'Invalid Credentials' }
      })
    }
  })
  .catch(err => {
    console.log('ERROR: promise rejected', err)
    return res.status(500).json({ 'error querying database for user login': err })
  })

  /* User.query({
    where: { username: identifier },
    orWhere: { email: identifier }
  })
  .fetch()
  .then(user => {
    if (user) {
      if (bcrypt.compareSync(password, user.get('password_digest'))) {
        const token = jwt.sign({
          id: user.get('id'),
          username: user.get('username')
        }, config.jwtSecret)
        res.json({ token })
      } else {
        res.status(401).json({
          errors: { form: 'Invalid Credentials' }
        })
      }
    } else {
      res.status(401).json({
        errors: { form: 'Invalid Credentials' }
      })
    }
  })
  .catch(err => console.error('authentication error', err)) */
})

module.exports = router
