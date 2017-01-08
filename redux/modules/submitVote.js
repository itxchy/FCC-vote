import axios from 'axios'

// action
const SUBMIT_VOTE = 'SUBMIT_VOTE'

// action creator

/** TODO:
 * After a new vote is submitted, the poll on the client page 
 * should show the results, including the the new vote
 */
export function submitVote (id, vote) {
  return dispatch => {
    axios.put(`/api/polls/${id}`, vote)
      .then(res => {
        dispatch(pollUpdate(id))
      })
  }
}
