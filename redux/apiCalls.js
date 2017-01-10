import axios from 'axios'

export function submitNewPoll (newPoll) {
  return axios.post('/api/polls', newPoll)
}
export function getUserPolls (user) {
  return axios.get(`/api/polls/${user}`)
}
