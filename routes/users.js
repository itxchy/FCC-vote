const express = require('express')
const commonValidations = require('./shared/signupValidation.js')
const bcrypt = require('bcrypt')
const isEmpty = require('lodash/isEmpty')

const User = require('../models/User')

let router = express.Router()

function validateInput (data, otherValidations) {
  let { errors } = otherValidations(data)

  // checks if the submitted email or username is already taken
  return User.find({ $or: [{ email: data.email }, { username: data.username}] })
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
      console.error('ERROR: user validation promise rejected', err)
      return Promise.reject(err)
    })


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
  User.find({ $or: [{ email: req.params.identifier }, { username: req.params.identifier }] })
  .select('username email')
  .exec()
  .then(user => {
    console.log('user found!', user)
    if (isEmpty(user)) {
      return res.json({user: null})
    }
    return res.json({user})
  })
  .catch(err => {
    console.log('find user promise rejection')
     res.status(400).json({ 'user lookup error': err })
  })
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
 * Creates a new user and saves the credentials
 * to the User table, if they pass validation
 */
router.post('/', (req, res) => {
  validateInput(req.body, commonValidations)
    .then((results) => {
      console.log('results object should contain isValid and errors', results)
      if (results.isValid) {
        const { username, password, email } = req.body
        const passwordDigest = bcrypt.hashSync(password, 10)
        let user = new User()
        user.username = username
        user.email = email
        user.passwordDigest = passwordDigest

        user.save()
        .then(user => {
          res.json({ success: 'signup successful!', user: user })
        }) 
        .catch(err => {
          res.status(500).json({ 'save user error': err })
        })
        /*User.forge({
          username, email, password_digest
        }, { hasTimestamps: true }).save()
          .then(user => res.json({success: true}))
          .catch(err => res.status(500).json({error: err}))*/
      } else {
        res.status(400).json({ 'user input validation error': results.errors })
      }
    })
    .catch(err => res.status(500).json({ 'validate user input error': err }))
})

module.exports = router
