import axios from 'axios'

export function submitNewPoll (newPoll) {
  return axios.post('/api/polls', newPoll)
}
export function getUserPolls (user) {
  return axios.get(`/api/polls/${user}`)
}

export function userSignupRequest (userData) {
  return axios.post('/api/users', userData)
}
export function isUserExists (identifier) {
  return axios.get(`/api/users/${identifier}`)
}
