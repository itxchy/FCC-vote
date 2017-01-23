import axios from 'axios'

// Action
const POLL_EDITED = 'POLL_EDITED'

// Action Creators
export function setEditedPoll (id, pollData) {
  return dispatch => {
    axios.put(`/api/polls/edit/${id}`, pollData)
      .then(res => {
        const editedPoll = res.data.updatedDoc
        dispatch(pollEdited(editedPoll))
      })
      .catch(err => {
        console.log('edit poll error', err.response.data)
      })
  }
}
function pollEdited (editedPoll) {
  return { type: POLL_EDITED, editedPoll: editedPoll }
}

// Reducer
function reducePollEdited (state, action) {
  return Object.assign({}, state, { editedPoll: action.editedPoll })
}

// Root Reducer Slice
const initialState = {
  editedPoll: null
}
export default function editPoll (state = initialState, action) {
  switch (action.type) {
    case POLL_EDITED:
      return reducePollEdited(state, action)
    default:
      return state
  }
}
