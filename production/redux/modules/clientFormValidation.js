'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DEFAULT_STATE = undefined;
exports.dupeUserCheck = dupeUserCheck;
exports.dupeUserCheckResults = dupeUserCheckResults;
exports.newFormErrors = newFormErrors;
exports.default = clientFormValidation;
exports.checkUserInResponse = checkUserInResponse;

var _axios = require('axios');

var _axios2 = _interopRequireDefault(_axios);

var _validator = require('validator');

var _validator2 = _interopRequireDefault(_validator);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var DEFAULT_STATE = exports.DEFAULT_STATE = {
  errors: {
    username: null,
    email: null,
    password: null,
    passwordConfirmation: null
  },
  invalid: false
};

// ******* Action Types *******

var DUPE_USER_CHECK_RESULTS = 'DUPE_USER_CHECK_RESULTS';
var SET_FORM_ERRORS = 'SET_FORM_ERRORS';

// ******* Action Creators & Reducers *******

/**
 * Checks if an email or username entered at signup match an existing
 * user in the database. If a match is found in checkUserInResponse, the
 * errors object will be populated with an error message for the field given
 * as a parameter. If no match is found, errors will be null. After checking
 * for a duplicate user, checkUserInResponse will also verify that email fields
 * given to it are valid. If not, the errors object will contain an email
 * validation error. If any errors are present, the invalid bool will be true.
 *
 * @param {string} identifier - The form value from either the username or
 *   email field as event.target.value
 *
 * @param {string} field - The form field name, either username or email as
 *   event.target.field
 *
 * @param {object} validationErrors - The current validation errors from
 *   this module's state.errors as Signup.jsx received as props. There's
 *   probably a better way to access that object from within this module.
 */
function dupeUserCheck(identifier, field, validationErrors) {
  return function (dispatch) {
    _axios2.default.get('/api/users/' + identifier).then(function (res) {
      var _checkUserInResponse = checkUserInResponse(res, field, identifier),
          invalid = _checkUserInResponse.invalid,
          errors = _checkUserInResponse.errors;

      var newErrors = Object.assign({}, validationErrors, errors);
      dispatch(dupeUserCheckResults(newErrors, invalid));
    }).catch(function (err) {
      var invalid = true;
      var errors = { server: 'username/email lookup failed' };
      var newErrors = Object.assign({}, validationErrors, errors);
      dispatch(dupeUserCheckResults(newErrors, invalid));
      console.error('dupe user check failed!', err.response.data);
    });
  };
}

/**
 * Sets state.errors and state.invalid
 *
 * @param {object} errors - Errors object returned from checkUserInResponse combined
 *   with existing validation errors
 *
 * @param {bool} invalid - If errors are present from checkUserInResponse, this
 *   should be true. If there are no errors, invalid will be false. The truthyness
 *   of invalid determines whether the submit button is disabled or not.
 */
function dupeUserCheckResults(errors, invalid) {
  return { type: DUPE_USER_CHECK_RESULTS, errors: errors, invalid: invalid };
}
function dupeUserCheckReducer(state, action) {
  return Object.assign({}, state, {
    errors: action.errors,
    invalid: action.invalid
  });
}

/**
 * Creates a new error object combining new errors with current errors
 */
function newFormErrors(currentErrors, newErrors) {
  var updatedErrors = Object.assign({}, currentErrors, newErrors);
  return { type: SET_FORM_ERRORS, errors: updatedErrors };
}
function setFormErrorsReducer(state, action) {
  return Object.assign({}, state, {
    errors: action.errors
  });
}

// ******* Root Reducer Slice *******

function clientFormValidation() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : DEFAULT_STATE;
  var action = arguments[1];

  switch (action.type) {
    case DUPE_USER_CHECK_RESULTS:
      return dupeUserCheckReducer(state, action);
    case SET_FORM_ERRORS:
      return setFormErrorsReducer(state, action);
    default:
      return state;
  }
}

// ************** Lib **************

function checkUserInResponse(res, field, identifier) {
  console.log('checkUserInResponse:', res, 'field:', field);
  var invalid = void 0;
  var errors = {};
  if (res.data && res.data.user) {
    errors[field] = 'A user exists with this ' + field;
    invalid = true;
  } else {
    errors[field] = null;
    invalid = false;
  }
  if (!invalid && field === 'email' && !_validator2.default.isEmail(identifier)) {
    errors.email = 'This email address is invalid';
    invalid = true;
  }
  return {
    errors: errors,
    invalid: invalid
  };
}