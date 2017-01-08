import axios from 'axios'

// action
const SUBMIT_VOTE = 'SUBMIT_VOTE'
const SHOW_UPDATED_POLL_RESULTS = 'SHOW_UPDATED_POLL_RESULTS'

// action creator

/** TODO:
 * After a new vote is submitted, the poll on the client page
 * should show the results, including the the new vote
 */
export function submitVote (id, vote) {
  return dispatch => {
    axios.put(`/api/polls/${id}`, vote)
      .then(res => {
        // new poll results should be returned
        console.log('new poll results, and totalVotes should be in the response:', res)
        // dispatch(showUpdatedPollResults(...results))
      })
  }
}
