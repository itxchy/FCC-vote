import axios from 'axios'

// Action
const POLL_EDITED = 'POLL_EDITED'
const ACTIVE_POLL_DATA = 'ACTIVE_POLL_DATA'
const SET_POLL_TITLE = 'SET_POLL_TITLE'
const SET_POLL_OPTIONS = 'SET_POLL_OPTIONS'

// Action Creators
export function getPollData (id) {
  return dispatch => {
    axios.get(`/api/polls/id/${id}`)
      .then(res => {
        console.log('editPoll.js: getPollData response:', res)
        // dispatch setNewTile
        // dispatch setPollOptions
        dispatch(activePollData(res.data))
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
        console.log('edit poll error', err.response.data)
      })
  }
}
export function setPollTitle (newPollTitle) {
  return { type: SET_POLL_TITLE, newPollTitle }
}
export function setPollOptions (newPollOptions) {
  return { type: SET_POLL_OPTIONS, newPollOptions }
}
function pollEdited (editedPoll) {
  return { type: POLL_EDITED, editedPoll: editedPoll }
}
function activePollData (activePoll) {
  return { type: ACTIVE_POLL_DATA, activePollData: activePoll }
}

// Reducers
function reducePollEdited (state, action) {
  return Object.assign({}, state, { editedPoll: action.editedPoll })
}
function reduceActivePollData (state, action) {
  return Object.assign({}, state, { activePollData: action.activePollData })
}
function reduceSetPollTitle (state, action) {
  return Object.assign({}, state, { newPollTitle: action.pollTitle })
}
function reduceSetPollOptions (state, action) {
  return Object.assign({}, state, { newPollOptions: action.pollOptions })
}

// Root Reducer Slice
const initialState = {
  newPollTitle: '',
  titleEditable: true,
  newPollOptions: [
    '',
    ''
  ],
  editedPoll: null
}
export default function editPoll (state = initialState, action) {
  switch (action.type) {
    case POLL_EDITED:
      return reducePollEdited(state, action)
    case ACTIVE_POLL_DATA:
      return reduceActivePollData(state, action)
    case SET_POLL_TITLE:
      return reduceSetPollTitle(state, action)
    case SET_POLL_OPTIONS:
      return reduceSetPollOptions(state, action)
    default:
      return state
  }
}
