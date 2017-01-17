import axios from 'axios'

// Action
const USER_POLLS_DATA = 'USER_POLLS_DATA'

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
          dispatch(setUserPollsData({ polls: null }))
        }
      })
  }
}

// Reducer
function reduceUserPollsData (state, action) {
  return Object.assign({}, state, { userPolls: action.userPolls })
}

// Root Reducer
const initialState = {
  userPolls: null
}
export default function userPolls (state = initialState, action) {
  switch (action.type) {
    case USER_POLLS_DATA:
      return reduceUserPollsData(state, action)
    default:
      return state
  }
}
