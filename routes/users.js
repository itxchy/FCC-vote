const express = require('express')
const commonValidations = require('./shared/signupValidation.js')
const bcrypt = require('bcrypt')
const isEmpty = require('lodash/isEmpty')

const User = require('../models/User')

let router = express.Router()

function validateInput(data, otherValidations) {
  let { errors } = otherValidations(data)

  // checks if the submitted email or username is already taken
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

router.get('/:identifier', (req, res) => {
  User.query({
    select: ['username', 'email'],
    where: {email: req.params.identifier},
    orWhere: {username: req.params.identifier}
  }).fetch().then(user => {
    // if a user exists, it will be returned, 
    // otherwise, user will be null
    res.json({user})
  })
})

router.post('/', (req, res) => {

  validateInput(req.body, commonValidations)
    .then((errors, isValid) => {

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
