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
export function login (data) {
  return dispatch => {
    axios.post('/api/auth', data)
      .then(res => {
        console.log('redux: res.data:', res.data)      
        if (res.data.errors) {
          console.log('login failed!:', res.data.errors)
          return dispatch(setCurrentUser(res.data))
        }
        const token = res.data.token ? res.data.token : null
        if (token) {
          console.log('login success! decoding token...')
          localStorage.setItem('jwtToken', token)
          setAuthorizationToken(token)
          const user = jwt.decode(token)
          return dispatch(setCurrentUser(user))
        }
        console.error('no errors or token returned:', res)
        return dispatch(setCurrentUser({ errors: { server: 'no errors or token returned' } }))
      })
      .catch(err => {
        console.error('login error: ', err)
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
  if (action.user && !isEmpty(action.user)) {
    authenticationStatus = true
  }
  Object.assign(newState, state, {
    isAuthenticated: authenticationStatus,
    user: action.user
  })
  return newState
}

// Root Reducer Slice
export default function user (state = {}, action) {
  switch (action.type) {
    case SET_CURRENT_USER:
      return reduceSetCurrentUser(state, action)
    default:
      return state
  }
}
