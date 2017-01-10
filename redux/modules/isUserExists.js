import axios from 'axios'

export function isUserExists (identifier) {
  return dispatch => {
    return axios.get(`/api/users/${identifier}`)
  }
}
