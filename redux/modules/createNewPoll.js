import axios from 'axios'
import { addFlashMessage } from './flashMessage'

export const DEFAULT_STATE = {
  newPollTitle: '',
  titleEditable: true,
  newPollOptions: [
    '',
    ''
  ],
  pollSaved: null
}

// ******* Action Types *******

const SET_NEW_POLL_TITLE = 'SET_NEW_POLL_TITLE'
const SET_NEW_TITLE_EDITABLE = 'SET_NEW_TITLE_EDITABLE'
const UPDATE_OPTION = 'UPDATE_OPTION'
const RESET_NEW_POLL = 'RESET_NEW_POLL'
const POLL_SAVED = 'POLL_SAVED'
const RESET_POLL_SAVED = 'RESET_POLL_SAVED'

// ******* Action Creators & Reducers *******

/**
 * Sets state.newPollTitle
 *
 * @param {string} pollTitle
 */
export function setNewPollTitle (pollTitle) {
  return { type: SET_NEW_POLL_TITLE, value: pollTitle }
}
const setNewPollTitleReducer = (state, action) => {
  if (typeof action.value !== 'string') {
    console.error('ERROR: redux: setNewPollTitle wasn\'t passed a string:', action.value)
    return Object.assign({}, state)
  }
  return Object.assign({}, state, { newPollTitle: action.value })
}
/**
 * Sets state.titleEditable
 *
 * @param {boolean} bool
 */
export function setTitleEditable (bool) {
  return { type: SET_NEW_TITLE_EDITABLE, value: bool }
}
const setTitleEditableReducer = (state, action) => {
  if (typeof action.value !== 'boolean') {
    console.error('ERROR: redux: setTitleEditable was not passed a boolean:', action.value)
    return Object.assign({}, state, { titleEditable: true })
  }
  return Object.assign({}, state, { titleEditable: action.value })
}
/**
 * Sets state.newPollOptions
 *
 * @param {array} updatedOptions - An array of at least 2 strings
 */
export function updateOption (updatedOptions) {
  return { type: UPDATE_OPTION, value: updatedOptions }
}
const updateOptionReducer = (state, action) => {
  if (action.value.length < 2) {
    console.error('ERROR: redux: less than two options were passed to updateOption:', action.value)
    return Object.assign({}, state)
  }
  return Object.assign({}, state, { newPollOptions: action.value })
}
/**
 * Resets state to DEFAULT_STATE
 */
export function resetNewPoll () {
  return { type: RESET_NEW_POLL }
}
const resetNewPollReducer = (state, action) => {
  const newState = {}
  Object.assign(newState, state, DEFAULT_STATE)
  return newState
}
/**
 * Sets state.pollSaved as a new Poll's ID
 *
 * @param {string} pollId - A new poll's mongoDB _id
 */
export function pollSaved (pollId) {
  return { type: POLL_SAVED, pollId }
}
const pollSavedReducer = (state, action) => {
  if (typeof action.pollId !== 'string') {
    console.error('ERROR: redux: pollSaved was not passed an id as a string:', action.pollId)
    return Object.assign({}, state, { pollSaved: false })
  }
  return Object.assign({}, state, { pollSaved: action.pollId })
}
/**
 * Sets state.pollSaved as null
 */
export function resetPollSaved () {
  return { type: RESET_POLL_SAVED }
}
const resetPollSavedReducer = (state, action) => {
  return Object.assign({}, state, { pollSaved: null })
}
/**
 * Submits a new poll to the server
 *
 * @param {object} newPoll - an object containing a new poll's title, at least two
 * options, and the owner (user). Sample: { title: 'What number?', options: ['one', 'two'], owner: 'Lloyd'}
 *
 */
export function submitNewPoll (newPoll) {
  return dispatch => {
    axios.post('/api/polls', newPoll)
      .then(res => {
        console.log('newPoll submitted successfully!', res.data.poll._id)
        dispatch(resetNewPoll())
        dispatch(addFlashMessage({ type: 'success', text: 'Poll saved!' }))
        dispatch(pollSaved(res.data.poll._id))
      })
      .catch(err => {
        console.error('ERROR: redux: newPoll could not be saved', err)
        dispatch(addFlashMessage({ type: 'error', text: 'Something went wrong. Poll coudn\'t be saved.' }))
      })
  }
}

// ******* Root Reducer Slice *******

export default function newPoll (state = DEFAULT_STATE, action) {
  switch (action.type) {
    case SET_NEW_POLL_TITLE:
      return setNewPollTitleReducer(state, action)
    case SET_NEW_TITLE_EDITABLE:
      return setTitleEditableReducer(state, action)
    case UPDATE_OPTION:
      return updateOptionReducer(state, action)
    case RESET_NEW_POLL:
      return resetNewPollReducer(state, action)
    case POLL_SAVED:
      return pollSavedReducer(state, action)
    case RESET_POLL_SAVED:
      return resetPollSavedReducer(state, action)
    default:
      return state
  }
}
