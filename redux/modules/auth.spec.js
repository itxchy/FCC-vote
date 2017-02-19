import userReducerSlice from './auth'
import {
  DEFAULT_STATE,
  setCurrentUser,
  userLoading,
  setErrors,
  setClientIp
} from './auth.js'

describe('redux: user', () => {
  it('if the state parameter passed to the user root reducer slice is falsy, DEFAULT_STATE should be returned', () => {
    let state = userReducerSlice(undefined, {})
    console.log('test state Default:', state)
    expect(state).toEqual(DEFAULT_STATE)
  })

  describe('setCurrentUser', () => {
    const mockUser = { id: '12341234asdfasdf', username: 'PollKilla', iat: '1324567894'}
    let stateWithValidUser = userReducerSlice(DEFAULT_STATE, setCurrentUser(mockUser))
    it('should set state.user as the user object passed to setCurrentUser', () => {
      expect(stateWithValidUser.user).toBe(mockUser)
    })
    it('should set state.isAuthenticated to true if user object is valid', () => {
      expect(stateWithValidUser.isAuthenticated).toBe(true)
    })
    it('should set state.userLoading to false whether user object is valid or not', () => {
      expect(stateWithValidUser.userLoading).toBe(false)
    })
    it('should set state.isAuthenticated to false if user object is invalid', () => {
      let stateWithInvalidUser = userReducerSlice(DEFAULT_STATE, setCurrentUser({ error: 'bad news' }))
      expect(stateWithInvalidUser.isAuthenticated).toBe(false)
    })
  })

  describe('userLoading', () => {
    it('should set state.userLoading as the boolean passed to userLoading', () => {
      let state = userReducerSlice(DEFAULT_STATE, userLoading(true))
      expect(state.userLoading).toBe(true)
    })
    it('should keep state.userLoading as false if the parameter passed is not a boolean', () => {
      let state = userReducerSlice(DEFAULT_STATE, userLoading('wat'))
      expect(state.userLoading).toBe(false)
    })
  })

  describe('setErrors', () => {
    it('should set state.errors as the object passed to setErrors', () => {
      let state = userReducerSlice(DEFAULT_STATE, setErrors({ form: 'Invalid Credentials' }))
      expect(state.errors.form).toBe('Invalid Credentials')
    })
    it('should simply pass the new unchanged state along if setErrors\'s parameter is not an object', () => {
      let state = userReducerSlice(DEFAULT_STATE, setErrors(42))
      expect(state.errors).toBe(null)
    })    
    it('should call console.error if an unknown error key is passed with the error object, but still set the unknown error', () => {
      global.console = { error: jest.fn() }
      let state = userReducerSlice(DEFAULT_STATE, setErrors({ wat: 'is this really an error?' }))
      expect(console.error).toBeCalled()
      expect(state.errors.wat).toBe('is this really an error?')
    })
  })

  describe('setClientIp', () => {
    it('should set state.clientIp as the string passed to setClientIp', () => {
      let state = userReducerSlice(DEFAULT_STATE, setClientIp('100.000.000.000'))
      expect(state.clientIp).toBe('100.000.000.000')
    })
  })
})