import shortid from 'shortid'
import findIndex from 'lodash/findIndex'
import loMap from 'lodash/map'
import clone from 'lodash/clone'

export const ADD_FLASH_MESSAGE = 'ADD_FLASH_MESSAGE'
export const DELETE_FLASH_MESSAGE = 'DELETE_FLASH_MESSAGE'

export function addFlashMessage (message) {
  return { type: ADD_FLASH_MESSAGE, value: message }
}
export function deleteFlashMessage (id) {
  return { type: DELETE_FLASH_MESSAGE, value: id }
}

export const reduceAddFlashMessage = (state, action) => {
  const newState = {}

  Object.assign(newState, state, {
    flashMessages: [
      ...state.flashMessages,
      {
        id: shortid.generate(),
        messageType: action.value.type,
        messageText: action.value.text
      }
    ]
  })
  return newState
}
export const reduceDeleteFlashMessage = (state, action) => {
  const newState = {}

  const index = findIndex(state.flashMessages, {id: action.value})

  if (index >= 0) {
    // makes a clone of state.flashMessages to be mutated
    let newFlashMessages = loMap(state.flashMessages, clone)

    newFlashMessages.splice(index, 1)
    Object.assign(newState, state, {
      flashMessages: newFlashMessages
    })
    return newState
  }

  return state
}
