'use strict';

var Validator = require('validator');
var isEmpty = require('lodash/isEmpty');

function validateCreateAPollInput(data) {
  var errors = {};
  console.log('validateCreateAPollInput data:', data);
  if (Validator.isEmpty(data.newPollTitle)) {
    errors.newPollTitle = 'A title is required';
  }

  data.newPollOptions.map(function (option) {
    if (Validator.isEmpty(option)) {
      errors.newPollOptions = 'Blank options are not allowed';
    }
  });

  return {
    errors: errors,
    isValid: isEmpty(errors)
  };
}

module.exports = validateCreateAPollInput;