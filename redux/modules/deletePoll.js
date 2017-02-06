import axios from 'axios'
import { addFlashMessage } from './flashMessage'

// Action
const POLL_DELETED = 'POLL_DELETED'
const RESET_DELETED_POLL = 'RESET_DELETED_POLL'

// Action Creators
export function deletePoll (id) {
  console.log('deleting:', id)
  return dispatch => {
    axios.delete(`/api/polls/delete/${id}`)
      .then(res => {
        console.log('delete response:', res)
        // redirect home
        dispatch(addFlashMessage({ type: 'success', text: 'Poll deleted!' }))
        dispatch(pollDeleted(id))
      })
      .catch(err => {
        console.error('error: delete request to /api/polls/delete failed', err)
        dispatch(addFlashMessage({ type: 'error', text: 'Failed to delete poll. That\'s an error.' }))
      })
  }
}
function pollDeleted (id) {
  return {
    type: POLL_DELETED,
    pollId: id
  }
}
export function resetDeletedPoll () {
  return {
    type: RESET_DELETED_POLL
  }
}

// Reducer
const reducePollDeleted = function (state, action) {
  return Object.assign({}, state, { deletedPoll: action.pollId })
}
const reduceResetDeletedPoll = function (state, action) {
  return Object.assign({}, state, { deletedPoll: null })
}

// Root Reducer Slice
const initialState = {
  deletedPoll: null
}
export default function deletedPoll (state = initialState, action) {
  switch (action.type) {
    case POLL_DELETED:
      return reducePollDeleted(state, action)
    case RESET_DELETED_POLL:
      return reduceResetDeletedPoll(state, action)
    default:
      return state
  }
}
