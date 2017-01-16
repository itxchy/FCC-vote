import axios from 'axios'

// Action
const DUPE_USER_CHECK_RESULTS = 'DUPE_USER_CHECK_RESULTS'

// Action Creators
function dupeUserCheckResults (errors, invalid) {
  return { type: DUPE_USER_CHECK_RESULTS, errors, invalid }
}

export function isUserExists (identifier, field, validationErrors) {
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

// Reducer
function reduceDupeUserCheck (state, action) {
  const newState = {}
  Object.assign(newState, state, {
    errors: action.errors,
    invalid: action.invalid
  })
  return newState
}

const initialState = {
  errors: {},
  invalid: false
}

// Root Reducer Slice
export default function dupeUserCheck (state = initialState, action) {
  switch (action.type) {
    case DUPE_USER_CHECK_RESULTS:
      return reduceDupeUserCheck(state, action)
    default:
      return state
  }
}

// Lib

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
