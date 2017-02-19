import newPollReducerSlice from './createNewPoll'
import { 
  DEFAULT_STATE, 
  setNewPollTitle, 
  setTitleEditable, 
  updateOption,
  resetNewPoll,
  pollSaved,
  resetPollSaved
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
      expect(state.newPollTitle).toBe('Controversial Title')
    })
    it('should return previous state if setNewPollTitle\'s argument is not a string', () => {
      let state = Object.assign({}, DEFAULT_STATE, { newPollTitle: 'Test Title' })
      let newState = newPollReducerSlice(state, setNewPollTitle(null))
      expect(state.newPollTitle).toBe('Test Title')
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
    it('should return previous state if less than two option strings are given', () => {
      let state = Object.assign({}, DEFAULT_STATE, { newPollOptions: ['thing 1', 'thing 2']})
      let newState = newPollReducerSlice(state, updateOption(['thing 3']))
      expect(newState.newPollOptions).toEqual(expect.arrayContaining(['thing 1', 'thing 2']))
    })
  })

  describe('resetNewPoll', () => {
    it('should return the createNewPoll module to its default state', () => {
      let state = Object.assign({}, DEFAULT_STATE, { newPollTitle: 'Things' })
      expect(state.newPollTitle).toBe('Things')
      let newState = newPollReducerSlice(state, resetNewPoll())
      expect(newState).toEqual(DEFAULT_STATE)
    })
  })

  describe('pollSaved', () => {
    it('should set state.pollSaved as a string of a new poll\'s id', () => {
      let state = newPollReducerSlice(null, pollSaved('asdfASDF'))
      expect(state.pollSaved).toBe('asdfASDF')
    })
    it('should set state.pollSaved as false if a string is not passed to pollSaved', () => {
      let state = newPollReducerSlice(null, pollSaved(undefined))
      expect(state.pollSaved).toBe(false)
    })
  })

  describe('resetPollSaved', () => {
    it('should set state.pollSaved as null', () => {
      let state = Object.assign({}, DEFAULT_STATE, { pollSaved: 'CRAZYID4242'})
      expect(state.pollSaved).toBe('CRAZYID4242')
      let newState = newPollReducerSlice(state, resetPollSaved())
      expect(newState.pollSaved).toBe(null)
    })
  })
})
