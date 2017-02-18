import axios from 'axios'
import { addFlashMessage } from './flashMessage'

// Actions
const SET_NEW_POLL_TITLE = 'setNewPollTitle'
const SET_NEW_TITLE_EDITABLE = 'setTitleEditable'
const UPDATE_OPTION = 'updateOption'
const RESET_NEW_POLL = 'resetNewPoll'
const POLL_SAVED = 'POLL_SAVED'
const RESET_POLL_SAVED = 'RESET_POLL_SAVED'

// Action Creators
export function setNewPollTitle (pollTitle) {
  return { type: SET_NEW_POLL_TITLE, value: pollTitle }
}
export function setTitleEditable (bool) {
  return { type: SET_NEW_TITLE_EDITABLE, value: bool }
}
export function updateOption (updatedOptions) {
  return { type: UPDATE_OPTION, value: updatedOptions }
}
export function resetNewPoll () {
  return { type: RESET_NEW_POLL }
}
function pollSaved (pollId) {
  return { type: POLL_SAVED, pollId }
}
export function resetPollSaved () {
  return { type: RESET_POLL_SAVED }
}
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

// Reducers
const reduceNewPollTitle = (state, action) => {
  if (typeof action.value !== 'string') {
    console.error('ERROR: redux: setNewPollTitle wasn\'t passed a string:', action.value)
    return Object.assign({}, state)
  }
  return Object.assign({}, state, { newPollTitle: action.value })
}
const reduceTitleEditableState = (state, action) => {
  return Object.assign({}, state, { titleEditable: action.value })
}
const reduceOptionUpdate = (state, action) => {
  return Object.assign({}, state, { newPollOptions: action.value })
}
const reduceResetNewPoll = (state, action) => {
  const newState = {}
  const blankPollState = {
    newPollTitle: '',
    titleEditable: true,
    newPollOptions: [
      '',
      ''
    ],
    pollSaved: null
  }
  Object.assign(newState, state, blankPollState)
  return newState
}
const reducePollSaved = (state, action) => {
  return Object.assign({}, state, { pollSaved: action.pollId })
}
const reduceResetPollSaved = (state, action) => {
  return Object.assign({}, state, { pollSaved: null })
}

export const DEFAULT_STATE = {
  newPollTitle: '',
  titleEditable: true,
  newPollOptions: [
    '',
    ''
  ],
  pollSaved: null
}

// Root Reducer Slice
export default function newPoll (state = DEFAULT_STATE, action) {
  switch (action.type) {
    case SET_NEW_POLL_TITLE:
      return reduceNewPollTitle(state, action)
    case SET_NEW_TITLE_EDITABLE:
      return reduceTitleEditableState(state, action)
    case UPDATE_OPTION:
      return reduceOptionUpdate(state, action)
    case RESET_NEW_POLL:
      return reduceResetNewPoll(state, action)
    case POLL_SAVED:
      return reducePollSaved(state, action)
    case RESET_POLL_SAVED:
      return reduceResetPollSaved(state, action)
    default:
      return state
  }
}
