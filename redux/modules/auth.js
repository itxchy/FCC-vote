/* global localStorage */

import axios from 'axios'
import jwt from 'jsonwebtoken'
import setAuthorizationToken from '../../auth/setAuthorizationToken'

// ******* Actions *******

const SET_CURRENT_USER = 'SET_CURRENT_USER'
const USER_LOADING = 'USER_LOADING'
const SET_CLIENT_IP = 'SET_CLIENT_IP'
const SET_ERRORS = 'SET_ERRORS'

// ******* Action Creators *******

/**
 * Sets state.user, and eventually state.isAuthenticated and state.userLoading
 * in its reducer.
 *
 * @param {object} user - A decoded jwt, or an error object
 *
 * The token object being set to user will contain a newly authenitcated
 * user's id string and username string, as well as the token's timestamp as iat.
 * example: { id: '12341234asdfasdf', username: 'PollKilla', iat: '1324567894'}
 */
export function setCurrentUser (user = {}) {
  return {
    type: SET_CURRENT_USER,
    user
  }
}
/**
 * Sets state.userLoading
 *
 * @param {boolean} bool
 */
export function userLoading (bool) {
  return {
    type: USER_LOADING,
    userLoading: bool
  }
}
function setErrors (errors = {}) {
  return {
    type: SET_ERRORS,
    errors,
    userLoading: false
  }
}
function setClientIp (clientIp) {
  return {
    type: SET_CLIENT_IP,
    clientIp
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
    dispatch(userLoading(true))
    axios.post('/api/auth', data)
      .then(res => handleLoginResponse(res, dispatch))
      .catch(err => {
        dispatch(userLoading(false))
        console.error('ERROR: redux: caught error from \'/api/auth\' : ', err)
        return dispatch(setErrors({ errors: { server: 'Server error, bad response' } }))
      })
  }
}
export function logout () {
  return dispatch => {
    localStorage.removeItem('jwtToken')
    setAuthorizationToken(false)
    dispatch(setCurrentUser({}))
  }
}
export function getClientIp () {
  return dispatch => {
    axios.get('/api/auth/ip')
      .then(res => {
        dispatch(setClientIp(res.data.clientIp))
      })
      .catch(err => {
        console.error('ERROR: redux: failed to receive client ip address', err)
      })
  }
}

// ******* Reducers *******

export const reduceSetCurrentUser = (state, action) => {
  let authenticationStatus = false
  let user = action.user
  if (user && user.username) {
    authenticationStatus = true
  } else {
    console.error('ERROR: redux: invalid user object passed to setCurrentUser', user)
  }
  return Object.assign({}, state, {
    isAuthenticated: authenticationStatus,
    user: user,
    userLoading: false
  })
}
export const reduceUserLoading = (state, action) => {
  if (typeof action.userLoading !== 'boolean') {
    console.error('ERROR: redux: userLoading was not passed a boolean:', action.userLoading)
    return Object.assign({}, state, { userLoading: false })
  }
  return Object.assign({}, state, { userLoading: action.userLoading })
}
const reduceSetClientIp = (state, action) => {
  return Object.assign({}, state, { clientIp: action.clientIp })
}
const reduceSetErrors = (state, action) => {
  return Object.assign({}, state, { errors: action.errors, userLoading: action.userLoading })
}

export const DEFAULT_STATE = {
  isAuthenticated: null,
  user: null,
  errors: null,
  userLoading: false,
  clientIp: null
}

// ******* Root Reducer Slice *******

export default function user (state = DEFAULT_STATE, action) {
  switch (action.type) {
    case SET_CURRENT_USER:
      return reduceSetCurrentUser(state, action)
    case USER_LOADING:
      return reduceUserLoading(state, action)
    case SET_CLIENT_IP:
      return reduceSetClientIp(state, action)
    case SET_ERRORS:
      return reduceSetErrors(state, action)
    default:
      return state
  }
}

// ************** Lib **************

function handleLoginResponse (res, dispatch) {
  console.log('auth.js: res.data:', res.data)
  // handle unsuccessful login
  if (res.data.errors) {
    // res.data will contain { errors: { form: 'Invalid Credentials' } }
    return dispatch(setErrors(res.data.errors))
  }
  // handle token on successful login
  const user = prepareUserFromToken(res)
  if (user && user.username) {
    dispatch(setCurrentUser(user))
    return dispatch(userLoading(false))
  }
  // handle server error
  dispatch(userLoading(false))
  console.error('no errors or token offered from \'/api/auth\' :', res)
  return dispatch(setErrors({ errors: { server: 'no errors or token returned' } }))
}

function prepareUserFromToken (res) {
  const token = res.data.token ? res.data.token : null
  if (token) {
    localStorage.setItem('jwtToken', token)
    setAuthorizationToken(token)
    const user = jwt.decode(token)
    return user
  } else {
    return null
  }
}
