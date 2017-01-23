import axios from 'axios'
import has from 'lodash/has'

// Action
const UPDATED_POLL_RESULTS = 'UPDATED_POLL_RESULTS'
const RESET_UPDATED_POLL_RESULTS = 'RESET_UPDATED_POLL_RESULTS'

// Action Creators
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
        console.log('New, unique vote successful in submitVote!', res)
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
function updatedPollResults (results) {
  return { type: UPDATED_POLL_RESULTS, results }
}
export function resetUpdatedPollResults () {
  return { type: RESET_UPDATED_POLL_RESULTS, results: null }
}

// Reducers
function reduceUpdatedPollResults (state, action) {
  const newState = {}
  Object.assign(newState, state, { updatedResults: action.results })
  return newState
}
function reduceResetUpdatedPollResults (state, action) {
  const newState = {}
  Object.assign(newState, state, { updatedResults: action.results })
  return newState
}

const initialState = {
  updatedResults: null
}
// Root Reducer Slice
export default function newVote (state = initialState, action) {
  switch (action.type) {
    case UPDATED_POLL_RESULTS:
      return reduceUpdatedPollResults(state, action)
    case RESET_UPDATED_POLL_RESULTS:
      return reduceResetUpdatedPollResults(state, action)
    default:
      return state
  }
}
