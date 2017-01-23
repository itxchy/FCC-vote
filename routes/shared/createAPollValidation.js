import Validator from 'validator'
import isEmpty from 'lodash/isEmpty'

function validateCreateAPollInput (data) {
  let errors = {}
  console.log('validateCreateAPollInput data:', data)
  if (Validator.isEmpty(data.newPollTitle)) {
    errors.newPollTitle = 'A title is required'
  }

  data.newPollOptions.map(option => {
    if (Validator.isEmpty(option)) {
      errors.newPollOptions = 'Blank options are not allowed'
    }
  })

  return {
    errors,
    isValid: isEmpty(errors)
  }
}

export default validateCreateAPollInput
