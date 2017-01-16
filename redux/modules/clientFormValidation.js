import axios from 'axios'

// Action
const DUPE_USER_CHECK_RESULTS = 'DUPE_USER_CHECK_RESULTS'
const SET_FORM_ERRORS = 'SET_FORM_ERRORS'

// Action Creators
function dupeUserCheckResults (errors, invalid) {
  return { type: DUPE_USER_CHECK_RESULTS, errors, invalid }
}

export function dupeUserCheck (identifier, field, validationErrors) {
  return dispatch => {
    axios.get(`/api/users/${identifier}`)
      .then(res => {
        let { invalid, errors } = checkUserInResponse(res, field)
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

export function newFormErrors (currentErrors, newErrors) {
  const updatedErrors = Object.assign({}, currentErrors, newErrors)
  return { type: SET_FORM_ERRORS, errors: updatedErrors }
}

// Reducer
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

const initialState = {
  errors: {},
  invalid: false
}

// Root Reducer Slice
export default function clientFormValidation (state = initialState, action) {
  switch (action.type) {
    case DUPE_USER_CHECK_RESULTS:
      return reduceDupeUserCheck(state, action)
    case SET_FORM_ERRORS:
      return reduceSetFormErrors(state, action)
    default:
      return state
  }
}

// Lib **************************************************************

function checkUserInResponse (res, field) {
  console.log('isUserExists response:', res, 'field:', field)
  let invalid
  let errors = {}
  if (res.data.user) {
    errors[field] = 'A user exists with this ' + field
    invalid = true
  } else {
    errors[field] = null
    invalid = false
  }
  return {
    errors,
    invalid
  }
}
