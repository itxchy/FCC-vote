import editPollReducer from './editPoll'
import mockPollObject from './__mock__/pollObject'
import {
  DEFAULT_STATE,
  setPollTitle,
  setPollOptions,
  setTitleEditable,
  resetPoll,
  pollEdited,
  activePollData
} from './editPoll'

describe('redux: editPoll', () => {
  it('should return default state when no state is given', () => {
    const state = editPollReducer(undefined, {})
    expect(state).toEqual(DEFAULT_STATE)
  })

  describe('setPollTitle', () => {
    it('should update state.newPollTitle with a string', () => {
      const state = editPollReducer(DEFAULT_STATE, setPollTitle('test'))
      expect(state.newPollTitle).toEqual('test')
    })
  })

  describe('setPollOptions', () => {
    it('should set state.newPollOptions as an array of at least two option strings', () => {
      const state = editPollReducer(DEFAULT_STATE, setPollOptions(['one', 'two']))
      expect(state.newPollOptions[0]).toEqual('one')
      expect(state.newPollOptions[1]).toEqual('two')
    })
  })

  describe('setTitleEditable', () => {
    it('should set state.titleEditable to a boolean', () => {
      const state = editPollReducer(DEFAULT_STATE, setTitleEditable(false))
      expect(state.titleEditable).toEqual(false)
    })
  })

  describe('resetPoll', () => {
    it('should reset everything to default state', () => {
      const state = editPollReducer({
        newPollTitle: 'Trending Poll',
        titleEditable: false,
        newPollOptions: [
          'Controversial idea',
          'Safe idea'
        ],
        editedPoll: null,
        activePollData: null
      }, resetPoll())
      expect(state).toEqual(DEFAULT_STATE)
    })
  })

  describe('pollEdited', () => {
    it('should set state.editedPoll as an edited poll object', () => {
      const state = editPollReducer(DEFAULT_STATE, pollEdited(mockPollObject))
      expect(state.editedPoll).toEqual(mockPollObject)
    })
  })

  describe('activePollData', () => {
    it('should set state.activePollData as the data of the poll being edited', () => {
      const state = editPollReducer(DEFAULT_STATE, activePollData(mockPollObject))
      expect(state.activePollData).toEqual(mockPollObject)
    })
  })
})