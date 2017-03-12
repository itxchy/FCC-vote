import axios from 'axios'
import { addFlashMessage } from './flashMessage'

export const DEFAULT_STATE = {
  deletedPoll: null
}

// ******* Action Types *******

const POLL_DELETED = 'POLL_DELETED'
const RESET_DELETED_POLL = 'RESET_DELETED_POLL'

// ******* Action Creators & Reducers *******

export function deletePoll (id) {
  return dispatch => {
    axios.delete(`/api/polls/delete/${id}`)
      .then(res => {
        if (res.data.hasOwnProperty('ok') && res.data.ok) {
          dispatch(addFlashMessage({ type: 'success', text: 'Poll deleted!' }))
          dispatch(pollDeleted(id))
        } else {
          console.error('error: delete response from /api/polls/delete not ok', res.data )
           dispatch(addFlashMessage({ type: 'error', text: 'Failed to delete poll. That\'s an error.' }))
        }
      })
      .catch(err => {
        console.error('error: delete request to /api/polls/delete failed', err)
        dispatch(addFlashMessage({ type: 'error', text: 'Failed to delete poll. That\'s an error.' }))
      })
  }
}

/**
 * Sets state.deletedPoll as the just-deleted poll's id
 *
 * @param {string} id - poll id of deleted poll
 */
export function pollDeleted (id) {
  return {
    type: POLL_DELETED,
    pollId: id
  }
}
const pollDeletedReducer = function (state, action) {
  return Object.assign({}, state, { deletedPoll: action.pollId })
}

/**
 * Sets state.deletedPoll as null
 */
export function resetDeletedPoll () {
  return {
    type: RESET_DELETED_POLL
  }
}
const resetDeletedPollReducer = function (state, action) {
  return Object.assign({}, state, DEFAULT_STATE)
}

// ******* Root Reducer Slice *******

export default function deletedPoll (state = DEFAULT_STATE, action) {
  switch (action.type) {
    case POLL_DELETED:
      return pollDeletedReducer(state, action)
    case RESET_DELETED_POLL:
      return resetDeletedPollReducer(state, action)
    default:
      return state
  }
}
