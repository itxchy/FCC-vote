const Validator = require('validator')
const isEmpty = require('lodash/isEmpty')

function validateInput (data) {
  let errors = {}

  if (Validator.isEmpty(data.identifier)) {
    errors.identifier = 'This field is required'
  }

  if (Validator.isEmpty(data.password)) {
    errors.password = 'This field is required'
  }

  return {
    errors,
    isValid: isEmpty(errors)
  }
}

module.exports = validateInput
