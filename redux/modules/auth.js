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
/**
 * Sets state.errors
 *
 * @param {object} errors - should contain a form error or server error
 * example: { form: 'Invalid Credentials' } or { server: 'Server error. Try agian in a moment.' }
 */
export function setErrors (errors = {}) {
  return {
    type: SET_ERRORS,
    errors,
    userLoading: false
  }
}
/**
 * Sets state.clientIp
 *
 * @param {string} clientIp - The client's IP address as a string received from the server.
 */
export function setClientIp (clientIp) {
  return {
    type: SET_CLIENT_IP,
    clientIp
  }
}
/**
 * Attempts to authenticate a user on the server.
 *
 * @param {object} data - An object containing an identifier and password to login with.
 * example: { identifier: 'TracyJordan', password: 'IAMMYOWNPASSWORD'}
 *
 * The response from /api/auth will be:
 * res.data.errors - errors object: { errors: { form: 'Invalid Credentials' } }
 * or
 * res.data.token - token object: { id: '12341234asdfasdf', username: 'PollKilla', iat: '1324567894'}
 */
export function login (data) {
  return dispatch => {
    dispatch(userLoading(true))
    axios.post('/api/auth', data)
      .then(res => handleLoginResponse(res, dispatch))
      .catch(err => {
        dispatch(userLoading(false))
        console.error('ERROR: redux: login request returned a server error:', err)
        return dispatch(setErrors({ server: 'Server error. Try agian in a moment.' }))
      })
  }
}
/**
 * Removes a user's jwt from localstorage and client headers, and clears user state in redux
 */
export function logout () {
  return dispatch => {
    localStorage.removeItem('jwtToken')
    setAuthorizationToken(false)
    dispatch(setCurrentUser({}))
  }
}
/**
 * Retrieves the client's IP address from the server
 */
export function getClientIp () {
  return dispatch => {
    axios.get('/api/auth/ip')
      .then(res => {
        dispatch(setClientIp(res.data.clientIp))
      })
      .catch(err => {
        console.error('ERROR: redux: failed to receive current client ip address from the server', err)
      })
  }
}

// ******* Reducers *******

export const setCurrentUserReducer = (state, action) => {
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
export const userLoadingReducer = (state, action) => {
  if (typeof action.userLoading !== 'boolean') {
    console.error('ERROR: redux: userLoading was not passed a boolean:', action.userLoading)
    return Object.assign({}, state, { userLoading: false })
  }
  return Object.assign({}, state, { userLoading: action.userLoading })
}
const setClientIpReducer = (state, action) => {
  return Object.assign({}, state, { clientIp: action.clientIp })
}
const setErrorsReducer = (state, action) => {
  if (!action.errors.form && !action.errors.server) {
    console.error('ERROR: redux: Unknown error key passed in error object to setErrors:', action.errors)
  }
  return Object.assign({}, state, { errors: action.errors })
}

// ******* Root Reducer Slice *******

export const DEFAULT_STATE = {
  isAuthenticated: null,
  user: null,
  errors: null,
  userLoading: false,
  clientIp: null
}
export default function user (state = DEFAULT_STATE, action) {
  switch (action.type) {
    case SET_CURRENT_USER:
      return setCurrentUserReducer(state, action)
    case USER_LOADING:
      return userLoadingReducer(state, action)
    case SET_CLIENT_IP:
      return setClientIpReducer(state, action)
    case SET_ERRORS:
      return setErrorsReducer(state, action)
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
  return dispatch(setErrors({ server: 'no errors or token returned' }))
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
