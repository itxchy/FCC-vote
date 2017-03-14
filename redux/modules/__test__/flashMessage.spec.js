/* global describe it expect */

import {
  default as flashMessagesReducer,
  DEFAULT_STATE,
  addFlashMessage,
  deleteFlashMessage,
  clearAllFlashMessages
} from '../flashMessage'

describe('redux: flashMessage', () => {
  it('should return default state if no state is given', () => {
    const state = flashMessagesReducer(undefined, {})
    expect(state).toEqual(DEFAULT_STATE)
  })

  describe('addFlashMessage', () => {
    it('should update state.flashMessages with a new flashMessage object', () => {
      const state = flashMessagesReducer(DEFAULT_STATE, addFlashMessage({ type: 'success', text: 'testing' }))
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

  describe('deleteFlashMessage', () => {
    it('should delete a flash message based on its id', () => {
      const state = flashMessagesReducer({ flashMessages: [
        { id: '123', messageType: 'success', messageText: 'keep' },
        { id: '456', messageType: 'error', messageText: 'be gone' }
      ]}, deleteFlashMessage('456'))
      expect(state.flashMessages.length).toEqual(1)
      expect(state.flashMessages[0].id).toEqual('123')
    })
  })

  describe('clearAllFlashMessages', () => {
    it('should reset state.flashMessages to its default state of null', () => {
      const state = flashMessagesReducer({ flashMessages: [
        { id: '123', messageType: 'success', messageText: 'keep' },
        { id: '456', messageType: 'error', messageText: 'be gone' }
      ]}, clearAllFlashMessages())
      expect(state).toEqual(DEFAULT_STATE)
    })
  })
})
