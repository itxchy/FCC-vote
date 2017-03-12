import axios from 'axios'
import has from 'lodash/has'

export const DEFAULT_STATE = {
  updatedResults: null
}

// ******* Action Types *******

const UPDATED_POLL_RESULTS = 'UPDATED_POLL_RESULTS'
const RESET_UPDATED_POLL_RESULTS = 'RESET_UPDATED_POLL_RESULTS'

// ******* Action Creators & Reducers *******

/**
 * @param id = string,
 * @param vote = object {selectedOption, voter}
 *
 * Dispatches a new vote request to the the database.
 *
 * If the voter already voted on the current poll,
 * {dupeVoter: true} is returned.
 * If the vote is unique, the new, updated poll object
 * is returned. Otherwise, a server error object is returned.
 */
export function submitVote (id, vote) {
  return dispatch => {
    axios.put(`/api/polls/${id}`, vote)
      .then(res => {
        // console.log('New, unique vote successful in submitVote!', res)
        const results = res.data.totalVotes
        dispatch(updatedPollResults(results))
      })
      .catch(err => {
        if (has(err.response.data, 'dupeVoter') && err.response.data.dupeVoter === true) {
          console.log('dupeVoter detected!:', err.response.data.dupeVoter)
        }
        if (has(err.response.data, 'error')) {
          console.error('submitVote server error:', err.response.data.error)
        }
      })
  }
}

/**
 * Sets state.updatedResults as a poll object of the newly updated poll
 *
 * @param {object} results
 */
export function updatedPollResults (results) {
  return { type: UPDATED_POLL_RESULTS, results }
}
function updatedPollResultsReducer (state, action) {
  return Object.assign({}, state, { updatedResults: action.results })
}

/**
 * Resets state.updatedResults to null
 */
export function resetUpdatedPollResults () {
  return { type: RESET_UPDATED_POLL_RESULTS }
}
function resetUpdatedPollResultsReducer (state, action) {
  const newState = {}
  Object.assign(newState, state, DEFAULT_STATE)
  return newState
}

// ******* Root Reducer Slice *******

export default function newVote (state = DEFAULT_STATE, action) {
  switch (action.type) {
    case UPDATED_POLL_RESULTS:
      return updatedPollResultsReducer(state, action)
    case RESET_UPDATED_POLL_RESULTS:
      return resetUpdatedPollResultsReducer(state, action)
    default:
      return state
  }
}
