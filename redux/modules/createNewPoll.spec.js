import newPollReducerSlice from './createNewPoll'
import { 
  DEFAULT_STATE, 
  setNewPollTitle, 
  setTitleEditable, 
  updateOption 
} from './createNewPoll'

describe('redux: newPoll', () => {
  it('falsy state should return default state', () => {
    let state = newPollReducerSlice(undefined, {})
    expect(state).toEqual(DEFAULT_STATE)
  })
  describe('setNewPollTitle', () => {
    it('should set state.newPollTitle as a string passed to setNewPollTitle', () => {
      let state = newPollReducerSlice(null, setNewPollTitle('Controversial Title'))
      // expect state to equal initial state along with newPollTitle as 'Controversial Title'
      expect(state.newPollTitle).toEqual('Controversial Title')
    })
    it('should return previous state if setNewPollTitle\'s argument is not a string', () => {
      let state = Object.assign({}, DEFAULT_STATE, { newPollTitle: 'Test Title' })
      let newState = newPollReducerSlice(state, setNewPollTitle(null))
      expect(state.newPollTitle).toEqual('Test Title')
    })
  })
  describe('setTitleEditable', () => {
    it('should set state.titleEditable as the boolean passed to setTitleEditable', () => {
      let state = newPollReducerSlice(null, setTitleEditable(false))
      expect(state.titleEditable).toBe(false)
    })
    it('should set or keep state.titleEditable as true if a boolean is not passed to setTitleEditable', () => {
      let state = newPollReducerSlice(null, setTitleEditable('I am not a boolean!'))
      expect(state.titleEditable).toBe(true)
    })
  })
  describe('updateOption', () => {
    it('should set state.newPollOptions as the array of option strings passed to it', () => {
      let state = newPollReducerSlice(null, updateOption(['thing 1', 'thing 2']))
      expect(state.newPollOptions).toEqual(expect.arrayContaining(['thing 1', 'thing 2']))
    })
  })
})