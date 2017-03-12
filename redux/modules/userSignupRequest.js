import axios from 'axios'
import { addFlashMessage } from './flashMessage'
import { login } from './auth'

export const DEFAULT_STATE = {
  signupLoading: false
}

// ******* Action Type *******

const SIGNUP_LOADING = 'SIGNUP_LOADING'

// ******* Action Creators & Reducer *******

export function signupRequest (userData) {
  return dispatch => {
    dispatch(signupLoading(true))
    return axios.post('/api/users', userData)
      .then(res => {
        dispatch(addFlashMessage({
          type: 'success',
          text: 'Signup successful!'
        }))
        dispatch(signupLoading(false))
        // automatically login new user
        const loginCredentials = {
          identifier: userData.email,
          password: userData.password
        }
        dispatch(login(loginCredentials))
      })
      .catch(err => {
        console.error('redux: userSignupRequest.js: signup error:', err)
        dispatch(addFlashMessage({
          type: 'error',
          text: 'Signup failed.'
        }))
        dispatch(signupLoading(false))
      })
  }
}

/**
 * Sets state.signupLoading to true while signupReqeust is working on the API call for
 * the signup request. Once the request resolves or rejects, signupLoading gets
 * set to false.
 *
 * @param {bool} bool
 */
export function signupLoading (bool) {
  return { type: SIGNUP_LOADING, signupLoading: bool }
}
function signupLoadingReducer (state, action) {
  return Object.assign({}, state, { signupLoading: action.signupLoading })
}

// ******* Root Reducer Slice *******

export default function userSignupRequest (state = DEFAULT_STATE, action) {
  switch (action.type) {
    case SIGNUP_LOADING:
      return signupLoadingReducer(state, action)
    default:
      return state
  }
}
