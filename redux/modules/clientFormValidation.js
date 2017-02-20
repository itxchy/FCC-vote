import axios from 'axios'
import Validator from 'validator'

// ******* Actions *******

const DUPE_USER_CHECK_RESULTS = 'DUPE_USER_CHECK_RESULTS'
const SET_FORM_ERRORS = 'SET_FORM_ERRORS'

// ******* Action Creators *******

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
function dupeUserCheckResults (errors, invalid) {
  return { type: DUPE_USER_CHECK_RESULTS, errors, invalid }
}

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
export function dupeUserCheck (identifier, field, validationErrors) {
  return dispatch => {
    axios.get(`/api/users/${identifier}`)
      .then(res => {
        let { invalid, errors } = checkUserInResponse(res, field, identifier)
        const newErrors = Object.assign({}, validationErrors, errors)
        dispatch(dupeUserCheckResults(newErrors, invalid))
      })
      .catch(err => {
        const invalid = true
        let errors = { server: 'username/email lookup failed' }
        const newErrors = Object.assign({}, validationErrors, errors)
        dispatch(dupeUserCheckResults(newErrors, invalid))
        console.error('dupe user check failed!', err.response.data)
      })
  }
}

/**
 * Creates a new error object combining new errors with current errors
 */
export function newFormErrors (currentErrors, newErrors) {
  const updatedErrors = Object.assign({}, currentErrors, newErrors)
  return { type: SET_FORM_ERRORS, errors: updatedErrors }
}

// ******* Reducers *******

function reduceDupeUserCheck (state, action) {
  return Object.assign({}, state, {
    errors: action.errors,
    invalid: action.invalid
  })
}
function reduceSetFormErrors (state, action) {
  return Object.assign({}, state, {
    errors: action.errors
  })
}

// ******* Root Reducer Slice *******

const DEFAULT_STATE = {
  errors: {
    username: null,
    email: null,
    password: null,
    passwordConfirmation: null
  },
  invalid: false
}
export default function clientFormValidation (state = DEFAULT_STATE, action) {
  switch (action.type) {
    case DUPE_USER_CHECK_RESULTS:
      return reduceDupeUserCheck(state, action)
    case SET_FORM_ERRORS:
      return reduceSetFormErrors(state, action)
    default:
      return state
  }
}

// ************** Lib **************

function checkUserInResponse (res, field, identifier) {
  console.log('checkUserInResponse:', res, 'field:', field)
  let invalid
  let errors = {}
  if (res.data.user) {
    errors[field] = 'A user exists with this ' + field
    invalid = true
  } else {
    errors[field] = null
    invalid = false
  }
  if (!invalid && field === 'email' && !Validator.isEmail(identifier)) {
    errors.email = 'This email address is invalid'
    invalid = true
  }
  return {
    errors,
    invalid
  }
}
