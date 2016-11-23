const express = require('express')
const validateInput = require('./shared/signupValidation.js')
const bcrypt = require('bcrypt')

const User = require('../models/User')

let router = express.Router()

router.post('/', (req, res) => {

  const { errors, isValid } = validateInput(req.body)

  if (isValid) {
    const { username, password, email } = req.body
    const password_digest = bcrypt.hashSync(password, 10)

    User.forge({
      username, email, password_digest
    }, { hasTimestamps: true }).save()
      .then(user => res.json({success: true}))
      .catch(err => res.status(500).json({error: err}))

  } else {
    res.status(400).json(errors)
  }

})

module.exports = router
