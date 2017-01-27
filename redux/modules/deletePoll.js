import axios from 'axios'
import { addFlashMessage } from './flashMessage'

// Action Creator
export function deletePoll (id) {
  console.log('deleting:', id)
  return dispatch => {
    axios.delete(`/api/polls/delete/${id}`)
      .then(res => {
        console.log('delete response:', res)
        // redirect home
        dispatch(addFlashMessage({ type: 'success', text: 'Poll deleted!' }))
      })
      .catch(err => {
        console.error('error: delete request to /api/polls/delete failed', err)
        dispatch(addFlashMessage({ type: 'error', text: 'Failed to delete poll. That\'s an error.' }))
      })
  }
}
