/* global describe it expect */

import {
  default as userSignupRequestReducerSlice,
  DEFAULT_STATE,
  signupLoading
} from '../userSignupRequest'

describe('redux: userSignupRequest', () => {
  it('should return default state when no state is passed in', () => {
    const state = userSignupRequestReducerSlice(undefined, {})
    expect(state).toEqual(DEFAULT_STATE)
  })

  describe('signupLoading', () => {
    it('should set state.signupLoading to a bool that is given as a parameter', () => {
      const state = userSignupRequestReducerSlice(DEFAULT_STATE, signupLoading(true))
      expect(state.signupLoading).toEqual(true)
    })
  })
})
