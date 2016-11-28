const express = require('express')
const User = require('../models/User')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

let router = express.Router()

router.post('/', (req, res) => {
  const { identifier, password } = req.body

  User.query({
    where: { username: identifier },
    orWhere: { email: identifier }
  }).fetch().then(user => {
    if (user) {
      if (bcrypt.compareSync(password, user.get('password_digest'))) {

      } else {
        res.status(401).json({ errors: { form: 'Invalid Credentials'}})
      }
    } else {
      res.status(401).json({ errors: { form: 'Invalid Credentials' } })
    }
  })
})

module.exports = router
