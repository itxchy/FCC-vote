import axios from 'axios'

const DEAULT_STATE = {
  allPolls: null
}

// ******* Action Type *******

const ALL_POLLS_DATA = 'ALL_POLLS_DATA'

// ******* Action Creators & Reducer *******

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

/**
 * Sets state.allPolls
 *
 * @param {array} res - An array of poll objects
 */
export function pollsData (res) {
  console.log('pollsData res', res)
  return {
    type: ALL_POLLS_DATA,
    allPolls: res
  }
}
const allPollsDataReducer = (state, action) => {
  const newState = {}
  Object.assign(newState, state, { allPolls: action.allPolls })
  return newState
}

// ******* Root Reducer Slice *******

export default function allPolls (state = DEAULT_STATE, action) {
  switch (action.type) {
    case ALL_POLLS_DATA:
      return allPollsDataReducer(state, action)
    default:
      return state
  }
}
