import axios from 'axios'
import has from 'lodash/has'

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
        // new poll results should be returned, or dupe
        // vote error
        console.log('New, unique vote successful in submitVote!')
        console.log('new poll results, and totalVotes should be in the response:', res)
        // dispatch(showUpdatedPollResults(...results))
      })
      .catch(err => {
        console.log('error caught in submitVote action creator')
        console.log('err.response.data:', err.response.data)

        if (has(err.response.data, 'dupeVoter') && err.response.data.dupeVoter === true) {
          console.log('dupeVoter detected!:', err.response.data.dupeVoter)
        }

        if (has(err.response.data, 'error')) {
          console.log('submitVote server error:', err.response.data.error)
          console.log('details:', err.response.data.details)
        }
      })
  }
}
