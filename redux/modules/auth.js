/* global localStorage */

import axios from 'axios'
import jwt from 'jsonwebtoken'
import setAuthorizationToken from '../../auth/setAuthorizationToken'
import isEmpty from 'lodash/isEmpty'

// Actions
export const SET_CURRENT_USER = 'setCurrentUser'
export const USER_LOADING = 'USER_LOADING'
export const SET_CLIENT_IP = 'SET_CLIENT_IP'
export const RESET_LOGOUT_REDIRECT = 'RESET_LOGOUT_REDIRECT'

// Action Creators
export function setCurrentUser (user) {
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
export function logout () {
  localStorage.removeItem('jwtToken')
  setAuthorizationToken(false)
  return { type: SET_CURRENT_USER, user: {}, logoutRedirect: true }
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
  let logoutRedirect = action.logoutRedirect
  if (action.user && !action.user.errors && !isEmpty(action.user)) {
    authenticationStatus = true
  }
  if (!action.logoutRedirect) {
    logoutRedirect = false
  }
  Object.assign(newState, state, {
    isAuthenticated: authenticationStatus,
    user: action.user,
    logoutRedirect
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

const initialState = {
  isAuthenticated: null,
  user: null,
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
    default:
      return state
  }
}

// Lib ******************************************************
function handleLoginResponse (res, dispatch) {
  // handle unsuccessful login
  if (res.data.errors) {
    dispatch(userLoading(false))
    // res.data will contain { errors: { form: 'Invalid Credentials' } }
    return dispatch(setCurrentUser(res.data))
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
