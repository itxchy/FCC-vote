/* eslint camelcase: 0 */
const express = require('express')
const commonValidations = require('./shared/signupValidation.js')
const bcrypt = require('bcrypt')
const isEmpty = require('lodash/isEmpty')

const User = require('../models/User')

let router = express.Router()

function validateInput (data, otherValidations) {
  if (isEmpty(data)) {
    console.log('DATA IS EMPTY:', data)
    return Promise.reject({ 'data object is empty in validateInput': data })
  }
  let { errors } = otherValidations(data)

  // checks if the submitted email or username is already taken
  return User.find({ 'username': data.username})
    .or({ 'email': data.email })
    .exec()
    .then(user => {
      if (user) {
        if (user.username === data.username) {
          errors.username = 'This username is taken'  
        }
        if (user.email === data.email) {
          errors.email = 'This email is already registered'
        }
      }

      return {
        errors,
        isValid: isEmpty(errors)
      }
    })
    .catch(err => console.error('error querying Person:', err))

  /*User.query({
    where: { email: data.email },
    orWhere: { username: data.username }
  })
  .fetch()
  .then(user => {
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
  .catch(err => console.error('duplicate user check error', err))*/
}

/**
 * Looks up a user based on username or email
 * If no user is found, the response will be null
 */
router.get('/:identifier', (req, res) => {
  User.find({ username: req.params.identifier })
  .or({ email: req.params.identifier })
  .select('username email')
  .exec()
  .then(user => {
    console.log('client validation: user found ->', user)
    if (isEmpty(user)) {
      return res.json({user: null})
    }
    return res.json({user})
  })
  .catch(err => console.error('Mongoose error, couldn\'t query user:', err))
/*  User.query({
    select: ['username', 'email'],
    where: { email: req.params.identifier },
    orWhere: { username: req.params.identifier }
  })
  .fetch()
  .then(user => {
    res.json({user})
  })
  .catch(err => console.error('user lookup error', err))*/
})

/**
 * Creates a new user document and saves it
 * to the User collection, if the credentials pass validation
 */
router.post('/', (req, res) => {
  validateInput(req.body, commonValidations)
    .then((validationObj) => {
      console.log('errors should be empty', errors)
      console.log('isValid should be true:', isValid)
      const { errors, isValid } = validationObj
      if (isValid) {
        const { username, password, email } = req.body
        const password_digest = bcrypt.hashSync(password, 10)

        let user = new User()
        user.username = username
        user.email = email
        user.password_digest = password_digest

        user.save()
        .then((user) => {
          console.log('user saved!:', user)
          // TODO remove newUser key
          res.json({ success: 'user saved!', newUser: user })
        })
        .catch(err => res.status(500).json({error: err}))

        /*User.forge({
          username, email, password_digest
        }, { hasTimestamps: true }).save()
          .then(user => res.json({success: true}))
          .catch(err => res.status(500).json({error: err}))*/
      } else {
        res.status(400).json(errors)
      }
    })
    .catch(err => {
      console.error('create user error:', err)
      res.status(500).json({'create user error': err})
    })
})

module.exports = router
