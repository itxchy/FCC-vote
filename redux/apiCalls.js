export function submitNewPoll (newPoll) {
  return axios.post('/api/polls', newPoll)
}
export function getUserPolls (user) {
  return axios.get(`/api/polls/${user}`)
}
export function getAllPolls () {
  return axios.get(`/api/polls`)
}
export function submitVote (id, vote) {
  return axios.put(`/api/polls/${id}`, vote)
}
export function userSignupRequest (userData) {
  return axios.post('/api/users', userData)
}
export function isUserExists (identifier) {
  return axios.get(`/api/users/${identifier}`)
}
