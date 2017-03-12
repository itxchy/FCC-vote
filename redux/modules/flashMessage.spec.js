import flashMessagesReducer from './flashMessage'
import {
  DEFAULT_STATE,
  addFlashMessage,
  deleteFlashMessage,
  clearAllFlashMessages
} from './flashMessage'

describe('redux: flashMessage', () => {
  it('should return default state if no state is given', () => {
    const state = flashMessagesReducer(undefined, {})
    expect(state).toEqual(DEFAULT_STATE)
  })

  describe('addFlashMessage', () => {
    it('should update state.flashMessages with a new flashMessage object', () => {
      const state = flashMessagesReducer(DEFAULT_STATE, addFlashMessage({ type: 'success', text: 'testing'}))
      expect(state.flashMessages[0].messageType).toEqual('success')
      expect(state.flashMessages[0].messageText).toEqual('testing')
    })
    it('should add a new flash message while keeping existing flash messages', () => {
      const state = flashMessagesReducer(DEFAULT_STATE, addFlashMessage({ type: 'success', text: 'testing' }))
      const state2 = flashMessagesReducer(state, addFlashMessage({ type: 'error', text: 'testing42' }))
      expect(state2.flashMessages[0].messageType).toEqual('success')
      expect(state2.flashMessages[0].messageText).toEqual('testing')
      expect(state2.flashMessages[1].messageType).toEqual('error')
      expect(state2.flashMessages[1].messageText).toEqual('testing42')
      expect(state2.flashMessages[0].id).not.toEqual(state2.flashMessages[1].id)
    })
  })
})