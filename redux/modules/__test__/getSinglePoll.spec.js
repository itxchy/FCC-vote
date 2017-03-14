/* global describe it expect */

import mockPollObject from '../__mock__/pollObject'
import {
  default as singlePollReducer,
  DEFAULT_STATE,
  setSinglePollData,
  clearSinglePoll
} from '../getSinglePoll'

describe('redux: getSinglePoll', () => {
  it('should return default state when no state is given', () => {
    const state = singlePollReducer(undefined, {})
    expect(state).toEqual(DEFAULT_STATE)
  })

  describe('setSinglePollData', () => {
    it('should set state.singlePoll as an array with a single poll object', () => {
      const state = singlePollReducer(DEFAULT_STATE, setSinglePollData([ mockPollObject ]))
      expect(state).toEqual({ singlePoll: [mockPollObject] })
    })
  })

  describe('clearSinglePoll', () => {
    it('should reset state.singlePoll to default state', () => {
      const state = singlePollReducer({ singlePoll: [ mockPollObject ] }, clearSinglePoll())
      expect(state).toEqual(DEFAULT_STATE)
    })
  })
})
