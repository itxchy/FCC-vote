import axios from 'axios'
// import { addFlashMessage } from './addFlashMessage'

// action

// action creator
export function userSignupRequest (userData) {
  return dispatch => {
    return axios.post('/api/users', userData)
  }
}
