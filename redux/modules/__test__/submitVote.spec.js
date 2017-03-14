/* global describe it expect */

import mockPollObject from '../__mock__/pollObject'
import {
  default as newVoteReducer,
  DEFAULT_STATE,
  updatedPollResults,
  resetUpdatedPollResults
} from '../submitVote'

describe('redux: newVote', () => {
  it('should return default state', () => {
    const state = newVoteReducer(undefined, {})
    expect(state).toEqual(DEFAULT_STATE)
  })

  describe('updatedPollResults', () => {
    it('should set state.updatedResults as an updated poll results object', () => {
      const state = newVoteReducer(DEFAULT_STATE, updatedPollResults(mockPollObject))
      expect(state.updatedResults).toEqual(mockPollObject)
    })
  })

  describe('resetUpdatedPollResults', () => {
    it('should reset state.updatedResults to default state', () => {
      const state = newVoteReducer({ updatedResults: mockPollObject }, resetUpdatedPollResults())
      expect(state).toEqual(DEFAULT_STATE)
    })
  })
})
