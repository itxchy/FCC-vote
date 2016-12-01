const Validator = require('validator')

function validateCreateAPollInput (data) {
  let errors = {}

  if (Validator.isEmpty(data.newPollTitle)) {
    errors.newPollTitle = 'A title is required'
  }

  data.newPollOptions.map(option => {
    if (Validator.isEmpty(option)) {
      errors.newPollOptions = 'Blank options are not allowed'
    }
  })
}

module.exports = validateCreateAPollInput
