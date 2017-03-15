'use strict';

var Validator = require('validator');
var isEmpty = require('lodash/isEmpty');

function validateInput(data) {
  var errors = {};

  if (Validator.isEmpty(data.identifier)) {
    errors.identifier = 'This field is required';
  }

  if (Validator.isEmpty(data.password)) {
    errors.password = 'This field is required';
  }

  return {
    errors: errors,
    isValid: isEmpty(errors)
  };
}

module.exports = validateInput;