const express = require('express')
const commonValidations = require('./shared/signupValidation.js')
const bcrypt = require('bcrypt')
const isEmpty = require('lodash/isEmpty')
const { log } = require('../../server.js')

const User = require('../models/User')

let router = express.Router()

function validateInput (data, otherValidations) {
  let { errors } = otherValidations(data)

  // checks if the submitted email or username is already taken
  return User.find({ $or: [{ email: data.email }, { username: data.username }] })
    .exec()
    .then(user => {
      if (user.username === data.username) {
        errors.username = 'This username is taken.'
      }
      if (user.email === data.email) {
        errors.email = 'This email is already registered'
      }
      return {
        errors,
        isValid: isEmpty(errors)
      }
    })
    .catch(err => {
      log.error('validateInput.js: user validation promise rejected', { mongoose: true, err })
      return err
    })
}

/**
 * Looks up a user based on username or email
 * If no user is found, the response will be null
 */
router.get('/:identifier', (req, res) => {
  User.find({ $or: [{ email: req.params.identifier }, { username: req.params.identifier }] })
  .select('username email')
  .exec()
  .then(user => {
    log.info('user.js: user found', { user })
    if (isEmpty(user)) {
      return res.json({ user: null })
    }
    return res.json({ user })
  })
  .catch(err => {
    log.error('users.js: find user promise rejected', { mongoose: true, err })
    res.status(400).json({ 'user lookup error': err, error: err })
  })
})

/**
 * Creates a new user and saves the credentials
 * to the User table, if they pass validation
 */
router.post('/', (req, res) => {
  validateInput(req.body, commonValidations)
    .then((results) => {
      console.log('results object should contain isValid and errors', results)
      if (results.isValid) {
        log.info('users.js: user signup form validation successful', { results })
        const { username, password, email } = req.body
        const passwordDigest = bcrypt.hashSync(password, 10)
        let user = new User()
        user.username = username
        user.email = email
        user.passwordDigest = passwordDigest

        user.save()
        .then(user => {
          log.info('user.js: new user signup successful', { user })
          res.json({ success: 'signup successful!', user: user })
        })
        .catch(err => {
          log.error('user.js: new user signup failed', { mongoose: true, err })
          res.status(500).json({ 'save user error': err })
        })
      } else {
        log.info('user.js: user input validation error present', { results })
        res.status(400).json({ 'user input validation error': results.errors })
      }
    })
    .catch(err => res.status(500).json({ 'validate user input error': err }))
})

module.exports = router
