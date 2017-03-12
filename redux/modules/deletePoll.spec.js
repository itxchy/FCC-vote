import deletePollReducerSlice from './deletePoll'
import { 
  DEFAULT_STATE,
  pollDeleted,
  resetDeletedPoll
} from './deletePoll'

describe('redux: deletePoll', () => {
  it('should be initialized with default state if no state object is given', () => {
    const state = deletePollReducerSlice(undefined, {})
    expect(state).toEqual(DEFAULT_STATE)
  })

  describe('pollDeleted', () => {
    it('should set state.deletedPoll as the deleted poll\'s id', () => {
      const state = deletePollReducerSlice(DEFAULT_STATE, pollDeleted('123abc'))
      expect(state).toEqual({ deletedPoll: '123abc' })
    })
  })

  describe('resetDeletedPoll', () => {
    it('should set state.deletedPoll to default state', () => {
      const state = deletePollReducerSlice({ deletedPoll: '123abc' }, resetDeletedPoll())
      expect(state).toEqual(DEFAULT_STATE)
    })
  })
})