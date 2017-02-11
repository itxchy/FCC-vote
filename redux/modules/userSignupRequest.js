import axios from 'axios'
import { addFlashMessage } from './flashMessage'
import { login } from './auth'

// action
const SIGNUP_LOADING = 'SIGNUP_LOADING'

// action creator
export function signupLoading (bool) {
  return { type: SIGNUP_LOADING, signupLoading: bool }
}
export function signupRequest (userData) {
  return dispatch => {
    dispatch(signupLoading(true))
    console.log('userSignupRequest: userData', userData)
    return axios.post('/api/users', userData)
      .then(res => {
        console.log('userSignupRequest signup success!', res)
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
        // TODO: dispatch signup successful action to login the new user
        // and redirect him/her to the home page
      })
      .catch(err => {
        console.log('signup error:', err)
        dispatch(addFlashMessage({
          type: 'error',
          text: 'Signup failed.'
        }))
        dispatch(signupLoading(false))
      })
  }
}

// reducer
function reduceSignupLoading (state, action) {
  return Object.assign({}, state, { signupLoading: action.signupLoading })
}

// root reducer slice
const initialState = {
  signupLoading: false
}
export default function userSignupRequest (state = initialState, action) {
  switch (action.type) {
    case SIGNUP_LOADING:
      return reduceSignupLoading(state, action)
    default:
      return state
  }
}
