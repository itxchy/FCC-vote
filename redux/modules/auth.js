/* global localStorage */

import axios from 'axios'
import jwt from 'jsonwebtoken'
import setAuthorizationToken from '../../auth/setAuthorizationToken'
import isEmpty from 'lodash/isEmpty'

// Action
export const SET_CURRENT_USER = 'setCurrentUser'

// Action Creators
export function setCurrentUser (user) {
  return {
    type: SET_CURRENT_USER,
    user
  }
}
/**
 * Attempts to authenticate a user on the server, and then
 * dispatches setCurrentUser with either an authenticated
 * user object, or errors object depending on the login result.
 * 
 * The response from /api/auth will be:
 * res.data.errors
 * or 
 * res.data.token
 */
export function login (data) {
  return dispatch => {
    axios.post('/api/auth', data)
      .then(res => {
        // handle unsuccessful login   
        if (res.data.errors) {
          // res.data will contain { errors: { form: 'Invalid Credentials' } }
          return dispatch(setCurrentUser(res.data))
        }
        // build token for successful login
        const token = res.data.token ? res.data.token : null
        if (token) {
          localStorage.setItem('jwtToken', token)
          setAuthorizationToken(token)
          const user = jwt.decode(token)
          return dispatch(setCurrentUser(user))
        }
        // handle server error
        console.error('no errors or token offered from \'/api/auth\' :', res)
        return dispatch(setCurrentUser({ errors: { server: 'no errors or token returned' } }))
      })
      .catch(err => {
        console.error('caught error from \'/api/auth\' : ', err)
        return dispatch(setCurrentUser({ errors: { server: 'error caught, bad response'} }))
      })
  }
}
export function logout () {
  localStorage.removeItem('jwtToken')
  setAuthorizationToken(false)
  return { type: SET_CURRENT_USER, user: {} }
}

// Reducer
export const reduceSetCurrentUser = (state, action) => {
  const newState = {}
  console.log('action.user', action.user)
  let authenticationStatus = false
  if (action.user && !action.user.errors && !isEmpty(action.user)) {
    authenticationStatus = true
  }
  Object.assign(newState, state, {
    isAuthenticated: authenticationStatus,
    user: action.user
  })
  return newState
}

// Pre-Mount State
const initialState = {
  isAuthenticated: null,
  user: null
}

// Root Reducer Slice
export default function user (state = initialState, action) {
  switch (action.type) {
    case SET_CURRENT_USER:
      return reduceSetCurrentUser(state, action)
    default:
      return state
  }
}
