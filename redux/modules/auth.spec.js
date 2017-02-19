import userReducerSlice from './auth'
import {
  DEFAULT_STATE,
  setCurrentUser,
  userLoading
} from './auth.js'

describe('redux: user', () => {
  it('if the state parameter passed to the user root reducer slice is falsy, DEFAULT_STATE should be returned', () => {
    let state = userReducerSlice(undefined, {})
    expect(state).toEqual(DEFAULT_STATE)
  })

  describe('setCurrentUser', () => {
    const mockUser = { id: '12341234asdfasdf', username: 'PollKilla', iat: '1324567894'}
    let stateWithValidUser = userReducerSlice(null, setCurrentUser(mockUser))
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
      let stateWithInvalidUser = userReducerSlice(null, setCurrentUser({ error: 'bad news' }))
      expect(stateWithInvalidUser.isAuthenticated).toBe(false)
    })
  })

  describe('userLoading', () => {
    it('should set state.userLoading as the boolean passed to userLoading', () => {
      let state = userReducerSlice(null, userLoading(true))
      expect(state.userLoading).toBe(true)
    })
    it('should keep state.userLoading as false if the parameter passed is not a boolean', () => {
      let state = userReducerSlice(null, userLoading('wat'))
      expect(state.userLoading).toBe(false)
    })
  })
})