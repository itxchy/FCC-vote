const Validator = require('validator')
const isEmpty = require('lodash/isEmpty')

function validateInput (data) {
  let errors = {}

  // email ======================================

  if (Validator.isEmpty(data.email)) {
    errors.email = 'A valid Email is required'
  }

  if (!Validator.isEmail(data.email)) {
    errors.email = 'Email is invalid'
  }

  // password ===================================

  if (Validator.isEmpty(data.password)) {
    errors.password = 'A valid password is required'
  }

  if (Validator.isEmpty(data.passwordConfirmation)) {
    errors.passwordConfirmation = 'You must confirm your password'
  }

  if (!Validator.equals(data.password, data.passwordConfirmation)) {
    errors.passwordConfirmation = 'Passwords do not match'
  }

  // username ===================================

  if (Validator.isEmpty(data.username)) {
    errors.username = 'A valid username is required'
  }

  return {
    errors,
    isValid: isEmpty(errors)
  }
}
module.exports = validateInput
