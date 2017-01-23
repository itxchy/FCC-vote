import axios from 'axios'

export function getUserPolls (user) {
  return axios.get(`/api/polls/${user}`)
}
