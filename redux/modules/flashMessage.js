import shortid from 'shortid'
import findIndex from 'lodash/findIndex'
import loMap from 'lodash/map'
import clone from 'lodash/clone'

export const DEFAULT_STATE = {
  flashMessages: []
}

// ******* Action Types *******

const ADD_FLASH_MESSAGE = 'ADD_FLASH_MESSAGE'
const DELETE_FLASH_MESSAGE = 'DELETE_FLASH_MESSAGE'
const CLEAR_ALL_FLASH_MESSAGES = 'CLEAR_ALL_FLASH_MESSAGES'

// ******* Action Creators & Reducers *******

/**
 * Adds a new flash message object to the state.flashMessages array.
 * The message object will contain a 'type' key with a string value, either 'success' or 'error'.
 * It will also contain a 'text' key with a string value, which is a user-facing message.
 * example: { type: 'success', text: 'New poll created!' }
 *
 * @param {object} message - A flash message object
 */
export function addFlashMessage (message) {
  return { type: ADD_FLASH_MESSAGE, value: message }
}
const addFlashMessageReducer = (state, action) => {
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

/**
 * Deletes a flash message from state.flashmessage's array based on the
 * message object's id value.
 *
 * @param {string} id - The id of a flash message to delete
 */
export function deleteFlashMessage (id) {
  return { type: DELETE_FLASH_MESSAGE, value: id }
}
const deleteFlashMessageReducer = (state, action) => {
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

/**
 * Restores state.flashMessages to an empty array
 */
export function clearAllFlashMessages () {
  return { type: CLEAR_ALL_FLASH_MESSAGES }
}
const clearAllFlashMessagesReducer = (state, action) => {
  return Object.assign({}, state, DEFAULT_STATE)
}

// ******* Root Reducer Slice *******

export default function flashMessages (state = DEFAULT_STATE, action) {
  switch (action.type) {
    case ADD_FLASH_MESSAGE:
      return addFlashMessageReducer(state, action)
    case DELETE_FLASH_MESSAGE:
      return deleteFlashMessageReducer(state, action)
    case CLEAR_ALL_FLASH_MESSAGES:
      return clearAllFlashMessagesReducer(state, action)
    default:
      return state
  }
}
