import axios from 'axios'
import has from 'lodash/has'

// action
const SUBMIT_VOTE = 'SUBMIT_VOTE'
const UPDATED_POLL_RESULTS = 'SHOW_UPDATED_POLL_RESULTS'

// action creator

/** TODO:
 * After a new vote is submitted, the poll on the client page
 * should show the results, including the the new vote
 */

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
        // dispatch(updatedPollResults(...results))
      })
      .catch(err => {
        if (has(err.response.data, 'dupeVoter') && err.response.data.dupeVoter === true) {
          console.log('dupeVoter detected!:', err.response.data.dupeVoter)
        }
        if (has(err.response.data, 'error')) {
          console.log('submitVote server error:', err.response.data.error)
        }
      })
  }
}

