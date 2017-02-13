/* global localStorage */

import axios from 'axios'
import jwt from 'jsonwebtoken'
import setAuthorizationToken from '../../auth/setAuthorizationToken'
import isEmpty from 'lodash/isEmpty'

// Actions
export const SET_CURRENT_USER = 'setCurrentUser'
export const USER_LOADING = 'USER_LOADING'
export const SET_CLIENT_IP = 'SET_CLIENT_IP'
export const SET_LOGOUT_REDIRECT = 'SET_LOGOUT_REDIRECT'
export const RESET_LOGOUT_REDIRECT = 'RESET_LOGOUT_REDIRECT'
const SET_ERRORS = 'SET_ERRORS'

// Action Creators
export function setCurrentUser (user = {}) {
  console.log('auth.js: setCurrentUser user:', user)
  return {
    type: SET_CURRENT_USER,
    user
  }
}
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
        console.error('caught error from \'/api/auth\' : ', err)
        return dispatch(setCurrentUser({ errors: { server: 'error caught, bad response' } }))
      })
  }
}
// export function logout () {
//   localStorage.removeItem('jwtToken')
//   setAuthorizationToken(false)
//   return { type: SET_CURRENT_USER, user: {}, logoutRedirect: true }
// }
export function logout () {
  return dispatch => {
    localStorage.removeItem('jwtToken')
    setAuthorizationToken(false)
    dispatch(setCurrentUser({}))
    dispatch(setLogoutRedirect(true))
  }
}
function setLogoutRedirect (bool) {
  return { type: SET_LOGOUT_REDIRECT, logoutRedirect: true }
}
export function resetLogoutRedirect () {
  return { type: RESET_LOGOUT_REDIRECT, logoutRedirect: false }
}
export function getClientIp () {
  return dispatch => {
    axios.get('/api/auth/ip')
      .then(res => {
        dispatch(setClientIp(res.data.clientIp))
      })
      .catch(err => {
        console.error('error retrieving client ip address', err)
      })
  }
}

// Reducers
export const reduceSetCurrentUser = (state, action) => {
  const newState = {}
  let authenticationStatus = false
  let user = action.user
  let errors = action.errors
  let logoutRedirect = action.logoutRedirect
  if (user && isEmpty(errors) && !isEmpty(user)) {
    authenticationStatus = true
  }
  if (!logoutRedirect) {
    logoutRedirect = false
  }
  Object.assign(newState, state, {
    isAuthenticated: authenticationStatus,
    user: user,
    errors,
    logoutRedirect,
    userLoading: false
  })
  return newState
}
export const reduceUserLoading = (state, action) => {
  const newState = {}
  // console.log('reduceUserLoading -> action.userLoading:', action.userLoading)
  Object.assign(newState, state, { userLoading: action.userLoading })
  return newState
}
const reduceSetClientIp = (state, action) => {
  return Object.assign({}, state, { clientIp: action.clientIp })
}
const reduceResetLogoutRedirect = (state, action) => {
  return Object.assign({}, state, { logoutRedirect: false })
}
const reduceSetErrors = (state, action) => {
  return Object.assign({}, state, { errors: action.errors, userLoading: action.userLoading })
}

const initialState = {
  isAuthenticated: null,
  user: null,
  errors: null,
  userLoading: false,
  clientIp: null,
  logoutRedirect: false
}

// Root Reducer Slice
export default function user (state = initialState, action) {
  switch (action.type) {
    case SET_CURRENT_USER:
      return reduceSetCurrentUser(state, action)
    case USER_LOADING:
      return reduceUserLoading(state, action)
    case SET_CLIENT_IP:
      return reduceSetClientIp(state, action)
    case RESET_LOGOUT_REDIRECT:
      return reduceResetLogoutRedirect(state, action)
    case SET_ERRORS:
      return reduceSetErrors(state, action)
    default:
      return state
  }
}

// Lib ******************************************************
function handleLoginResponse (res, dispatch) {
  console.log('auth.js: res.data:', res.data)
  // handle unsuccessful login
  if (res.data.errors) {
    // res.data will contain { errors: { form: 'Invalid Credentials' } }
    return dispatch(setErrors(res.data.errors))
  }
  // handle token on successful login
  const user = prepareUserFromToken(res)
  if (user) {
    dispatch(setCurrentUser(user))
    return dispatch(userLoading(false))
  }
  // handle server error
  dispatch(userLoading(false))
  console.error('no errors or token offered from \'/api/auth\' :', res)
  return dispatch(setCurrentUser({ errors: { server: 'no errors or token returned' } }))
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

  // const token = res.data.token ? res.data.token : null
  // if (token) {
  //   localStorage.setItem('jwtToken', token)
  //   setAuthorizationToken(token)
  //   const user = jwt.decode(token)
  //   dispatch(setCurrentUser(user))
  //   return dispatch(userLoading(false))
  // }
