import axios from 'axios'

// Action
const POLL_EDITED = 'POLL_EDITED'
const ACTIVE_POLL_DATA = 'ACTIVE_POLL_DATA'
const SET_POLL_TITLE = 'SET_POLL_TITLE'
const SET_POLL_OPTIONS = 'SET_POLL_OPTIONS'
const SET_TITLE_EDITABLE = 'SET_TITLE_EDITABLE'
const RESET_POLL = 'RESET_POLL'

// Action Creators
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
        console.error('error: put request to /api/polls/edit failed:', err)
        // TODO dispatch flash message displaying error
      })
  }
}
export function setPollTitle (pollTitle) {
  return { type: SET_POLL_TITLE, pollTitle }
}
export function setPollOptions (pollOptions) {
  return { type: SET_POLL_OPTIONS, pollOptions }
}
export function setTitleEditable (bool) {
  return { type: SET_TITLE_EDITABLE, titleEditable: bool }
}
export function resetPoll () {
  return { type: RESET_POLL }
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
function reduceResetPoll (state, action) {
  return Object.assign({}, state, {
    newPollTitle: '',
    titleEditable: true,
    newPollOptions: [
      '',
      ''
    ],
    editedPoll: null,
    activePollData: null
  })
}

// Root Reducer Slice
const initialState = {
  newPollTitle: '',
  titleEditable: true,
  newPollOptions: [
    '',
    ''
  ],
  editedPoll: null,
  activePollData: null
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
    case RESET_POLL:
      return reduceResetPoll(state, action)
    default:
      return state
  }
}
