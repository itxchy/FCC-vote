/* global describe it expect */

import mockPollObject from '../__mock__/pollObject'
import {
  default as allPollsReducer,
  DEFAULT_STATE,
  pollsData
} from '../getAllPolls'

describe('redux: getAllPolls', () => {
  it('should return default state if no state is given', () => {
    const state = allPollsReducer(undefined, {})
    expect(state).toEqual(DEFAULT_STATE)
  })

  describe('pollsData', () => {
    it('should set state.allPolls as an array of poll objects', () => {
      const state = allPollsReducer(DEFAULT_STATE, pollsData([ mockPollObject, mockPollObject ]))
      expect(state).toEqual({ allPolls: [ mockPollObject, mockPollObject ] })
    })
  })
})
