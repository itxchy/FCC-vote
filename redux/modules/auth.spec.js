import userReducerSlice from './auth'
import {
  DEFAULT_STATE,
  setCurrentUser
} from './auth.js'

describe('redux: user', () => {
  it('if the state parameter passed to the user root reducer slice is falsy, DEFAULT_STATE should be returned', () => {
    let state = userReducerSlice(undefined, {})
    expect(state).toEqual(DEFAULT_STATE)
  })

  describe('setCurrentUser', () => {
    it('should set state.user as the user object passed to setCurrentUser', () => {
      const mockUser = { id: '12341234asdfasdf', username: 'PollKilla', iat: '1324567894'}
      let state = userReducerSlice(null, setCurrentUser(mockUser))
      expect(state.user).toBe(mockUser)
    })
  })
})