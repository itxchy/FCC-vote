import axios from 'axios'

const DEFAULT_STATE = {
  userPolls: null
}

// ******* Action Types *******

const USER_POLLS_DATA = 'USER_POLLS_DATA'
const CLEAR_USER_POLLS = 'CLEAR_USER_POLLS'

// ******* Action Creators & Reducers *******

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

/**
 * Sets state.userPolls as an array of a user's poll objects
 *
 * @param {array} userPolls
 */
function setUserPollsData (userPolls) {
  return { type: USER_POLLS_DATA, userPolls }
}
function userPollsDataReducer (state, action) {
  return Object.assign({}, state, { userPolls: action.userPolls })
}

/**
 * Sets state.userPolls back to null
 */
export function clearUserPolls () {
  return { type: CLEAR_USER_POLLS }
}
function clearUserPollsReducer (state, action) {
  return Object.assign({}, state, DEFAULT_STATE)
}

// ******* Root Reducer Slice *******

export default function userPolls (state = DEFAULT_STATE, action) {
  switch (action.type) {
    case USER_POLLS_DATA:
      return userPollsDataReducer(state, action)
    case CLEAR_USER_POLLS:
      return clearUserPollsReducer(state, action)
    default:
      return state
  }
}
