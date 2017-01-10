import axios from 'axios'

// action
const DUPE_USER_CHECK_RESULTS = 'DUPE_USER_CHECK_RESULTS'

// action creators
function dupeUserCheckResults(errors, invalid) {
  return { type: DUPE_USER_CHECK_RESULTS, errors, invalid }
}
export function isUserExists (identifier, field, validationErrors) {
  return dispatch => {
    axios.get(`/api/users/${identifier}`)
      .then(res => {
        let invalid
        let errors = {}
        if (res.data.user) {
          errors[field] = 'A user exists with this ' + field
          invalid = true
        } else {
          errors[field] = ''
          invalid = false
        }
        let newErrors = {}
        Object.assign(newErrors, validationsErrors, errors)
        // dispatch(actionCreator( newErrors, invalid ))
      })
  }
}
