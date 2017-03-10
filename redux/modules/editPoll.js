import axios from 'axios'
import { addFlashMessage } from './flashMessage'

const DEFAULT_STATE = {
  newPollTitle: '',
  titleEditable: true,
  newPollOptions: [
    '',
    ''
  ],
  editedPoll: null,
  activePollData: null
}

// ******* Action Types *******

const POLL_EDITED = 'POLL_EDITED'
const ACTIVE_POLL_DATA = 'ACTIVE_POLL_DATA'
const SET_POLL_TITLE = 'SET_POLL_TITLE'
const SET_POLL_OPTIONS = 'SET_POLL_OPTIONS'
const SET_TITLE_EDITABLE = 'SET_TITLE_EDITABLE'
const RESET_POLL = 'RESET_POLL'

// ******* Action Creators & Reducers *******

export function getPollData (id) {
  return dispatch => {
    axios.get(`/api/polls/id/${id}`)
      .then(res => {
        const poll = res.data[0]
        const options = poll.options.map(option => {
          return option.option
        })
        dispatch(setPollTitle(poll.title))
        dispatch(setPollOptions(options))
        dispatch(activePollData(res.data[0]))
      })
  }
}

export function setEditedPoll (id, pollData) {
  return dispatch => {
    axios.put(`/api/polls/edit/${id}`, pollData)
      .then(res => {
        const editedPoll = res.data.updatedDoc
        dispatch(pollEdited(editedPoll))
        // dispatch reset setNewTitle
        // dispatch dispatch setPollOptions
      })
      .catch(err => {
        console.error('redux: editPoll.js: setEditedPoll failed', err)
        dispatch(addFlashMessage({ type: 'error', text: 'Error: failed to submit edited poll' }))
      })
  }
}

/**
 * Sets state.newPollTitle from a change event in the title's text area
 *
 * @param {string} pollTitle - A new poll's title
 */
export function setPollTitle (pollTitle) {
  return { type: SET_POLL_TITLE, pollTitle }
}
function setPollTitleReducer (state, action) {
  return Object.assign({}, state, { newPollTitle: action.pollTitle })
}

/**
 * Sets state.newPollOptions as a new poll options array from adding/editing/deleting options
 *
 * @param {array} pollOptions - A new poll options array
 */
export function setPollOptions (pollOptions) {
  return { type: SET_POLL_OPTIONS, pollOptions }
}
function setPollOptionsReducer (state, action) {
  return Object.assign({}, state, { newPollOptions: action.pollOptions })
}

export function setTitleEditable (bool) {
  return { type: SET_TITLE_EDITABLE, titleEditable: bool }
}
function setTitleEditableReducer (state, action) {
  return Object.assign({}, state, { titleEditable: action.titleEditable })
}

export function resetPoll () {
  return { type: RESET_POLL }
}
function resetPollReducer (state, action) {
  return Object.assign({}, state, DEFAULT_STATE)
}

function pollEdited (editedPoll) {
  return { type: POLL_EDITED, editedPoll: editedPoll }
}
function pollEditedReducer (state, action) {
  return Object.assign({}, state, { editedPoll: action.editedPoll })
}

function activePollData (activePoll) {
  return { type: ACTIVE_POLL_DATA, activePollData: activePoll }
}
function activePollDataReducer (state, action) {
  return Object.assign({}, state, { activePollData: action.activePollData })
}

// ******* Root Reducer Slice *******

export default function editPoll (state = DEFAULT_STATE, action) {
  switch (action.type) {
    case POLL_EDITED:
      return pollEditedReducer(state, action)
    case ACTIVE_POLL_DATA:
      return activePollDataReducer(state, action)
    case SET_POLL_TITLE:
      return setPollTitleReducer(state, action)
    case SET_POLL_OPTIONS:
      return setPollOptionsReducer(state, action)
    case RESET_POLL:
      return resetPollReducer(state, action)
    case SET_TITLE_EDITABLE:
      return setTitleEditableReducer(state, action)
    default:
      return state
  }
}
