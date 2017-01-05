import axios from 'axios'

// Action
export const ALL_POLLS_DATA = 'ALL_POLLS_DATA'

// Action Creators
export function pollsData (res) {
  return {
    type: ALL_POLLS_DATA,
    allPolls: res
  }
}
export function getAllPolls () {
  return dispatch => {
    axios.get(`/api/polls`)
    .then(res => {
      if (res.data.length > 0) {
        dispatch(pollsData(res.data))
      } else {
        dispatch(pollsData(false))
      }
    })
  }
}

// Reducer
export const reduceAllPollsData = (state, action) => {
  const newState = {}
  Object.assign(newState, state, { allPolls: action.allPolls })
  return newState
}

// Root Reducer Slice
export default function allPolls (state = null, action) {
  switch (action.type) {
    case ALL_POLLS_DATA:
      return reduceAllPollsData(state, action)
    default:
      return state
  }
}
