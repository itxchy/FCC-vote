/* global localStorage */

import axios from 'axios'
import jwt from 'jsonwebtoken'
import setAuthorizationToken from '../../auth/setAuthorizationToken'
import isEmpty from 'lodash/isEmpty'

// ******* Actions *******

export const SET_CURRENT_USER = 'setCurrentUser'
export const USER_LOADING = 'USER_LOADING'
export const SET_CLIENT_IP = 'SET_CLIENT_IP'
// export const SET_LOGOUT_REDIRECT = 'SET_LOGOUT_REDIRECT'
// export const RESET_LOGOUT_REDIRECT = 'RESET_LOGOUT_REDIRECT'
const SET_ERRORS = 'SET_ERRORS'

// ******* Action Creators *******

/**
 * Sets state.user
 *
 * @param {object} user - A decoded jwt, or an error object
 *
 * The token object being set to user will contain a newly authenitcated
 * user's id string and username string, as well as the token's timestamp as iat.
 * example: { id: '12341234asdfasdf', username: 'PollKilla', iat: '1324567894'}
 */
export function setCurrentUser (user = {}) {
  console.log('redux: auth.js: setCurrentUser user:', user)
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
        console.error('caught error from \'/api/auth\' : ', err)
        return dispatch(setErrors({ errors: { server: 'error caught, bad response' } }))
      })
  }
}
export function logout () {
  return dispatch => {
    localStorage.removeItem('jwtToken')
    setAuthorizationToken(false)
    dispatch(setCurrentUser({}))
    // dispatch(setLogoutRedirect(true))
  }
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

// ******* Reducers *******

export const reduceSetCurrentUser = (state, action) => {
  const newState = {}
  let authenticationStatus = false
  let user = action.user
  if (user && !isEmpty(user)) {
    authenticationStatus = true
  }
  Object.assign(newState, state, {
    isAuthenticated: authenticationStatus,
    user: user,
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
const reduceSetErrors = (state, action) => {
  return Object.assign({}, state, { errors: action.errors, userLoading: action.userLoading })
}

export const DEFAULT_STATE = {
  isAuthenticated: null,
  user: null,
  errors: null,
  userLoading: false,
  clientIp: null,
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
