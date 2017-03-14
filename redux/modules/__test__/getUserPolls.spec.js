/* global describe it expect */

import mockPollObject from '../__mock__/pollObject'
import {
  default as userPollsReducer,
  DEFAULT_STATE,
  setUserPollsData,
  clearUserPolls
} from '../getUserPolls'

describe('redux: getUserPolls', () => {
  it('should return default state if no state is passed as a parameter', () => {
    const state = userPollsReducer(undefined, {})
    expect(state).toEqual(DEFAULT_STATE)
  })

  describe('setUserPollsData', () => {
    it('should set state.userPolls with an array of poll objects', () => {
      const state = userPollsReducer(DEFAULT_STATE, setUserPollsData([ mockPollObject, mockPollObject ]))
      expect(state).toEqual({ userPolls: [ mockPollObject, mockPollObject ] })
    })
  })

  describe('clearUserPolls', () => {
    it('should reset state.userPolls to default state of null', () => {
      const state = userPollsReducer({ userPolls: [ mockPollObject, mockPollObject ] }, clearUserPolls())
      expect(state).toEqual(DEFAULT_STATE)
    })
  })
})
