const express = require('express')
const commonValidations = require('./shared/signupValidation.js')
const bcrypt = require('bcrypt')
const Promise = require('bluebird')
const isEmpty = require('lodash/isEmpty')

const User = require('../models/User')

let router = express.Router()

function validateInput(data, otherValidations) {
  let { errors } = otherValidations(data)

  return User.query({
    where: { email: data.email },
    orWhere: { username: data.username}
  }).fetch().then(user => {
    if (user) {
      if (user.get('username') === data.username) {
        errors.username = 'This username isn\'t available.'
      }
      if (user.get('email') === data.email) {
        errors.email = 'A user is already registered to this email.'
      }
    }

    return {
      errors,
      isValid: isEmpty(errors)
    }
  })

}

router.post('/', (req, res) => {

  validateInput(req.body, commonValidations)
    .then(({errors, isValid}) => {

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
})

module.exports = router
