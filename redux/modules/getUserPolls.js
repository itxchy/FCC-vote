import axios from 'axios'

// Action
const USER_POLLS_DATA = 'USER_POLLS_DATA'
const CLEAR_USER_POLLS = 'CLEAR_USER_POLLS'

// Action Creators
function setUserPollsData (userPolls) {
  return { type: USER_POLLS_DATA, userPolls }
}
export function getUserPolls (username) {
  return dispatch => {
    axios.get(`/api/polls/${username}`)
      .then(res => {
        console.log('getUserPolls results for', username, 'are:', res)
        if (res.data.length > 0) {
          dispatch(setUserPollsData(res.data))
        } else {
          dispatch(setUserPollsData([{ polls: null }]))
        }
      })
  }
}
export function clearUserPolls () {
  return { type: CLEAR_USER_POLLS }
}

// Reducer
function reduceUserPollsData (state, action) {
  return Object.assign({}, state, { userPolls: action.userPolls })
}
function reduceClearUserPolls (state, action) {
  return Object.assign({}, state, { userPolls: null })
}

// Root Reducer
const initialState = {
  userPolls: null
}
export default function userPolls (state = initialState, action) {
  switch (action.type) {
    case USER_POLLS_DATA:
      return reduceUserPollsData(state, action)
    case CLEAR_USER_POLLS:
      return reduceClearUserPolls(state, action)
    default:
      return state
  }
}
