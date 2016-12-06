const express = require('express')
const User = require('../models/User')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const config = require('../config')

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

  User.query({
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
})

module.exports = router
