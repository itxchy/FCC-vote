import axios from 'axios'

export const DEFAULT_STATE = {
  singlePoll: null
}

// ******* Action Types *******

const SINGLE_POLL_DATA = 'SINGLE_POLL_DATA'
const CLEAR_SINGLE_POLL = 'CLEAR_SINGLE_POLL'

// ******* Action Creators & Reducers *******

export function getSinglePoll (id) {
  return dispatch => {
    axios.get(`/api/polls/id/${id}`)
      .then(res => {
        dispatch(setSinglePollData(res.data))
      })
  }
}

/**
 * Sets state.singlePoll with a single poll object in an array
 *
 * @param {array} poll - an array with one element, a poll object
 */
export function setSinglePollData (poll) {
  return { type: SINGLE_POLL_DATA, singlePoll: poll }
}
function singlePollDataReducer (state, action) {
  return Object.assign({}, state, { singlePoll: action.singlePoll })
}

/**
 * Sets state.singlePoll back to null
 */
export function clearSinglePoll () {
  return { type: CLEAR_SINGLE_POLL }
}
function clearSinglePollReducer (state, action) {
  return Object.assign({}, state, DEFAULT_STATE)
}

// ******* Root Reducer Slice *******

export default function singlePoll (state = DEFAULT_STATE, action) {
  switch (action.type) {
    case SINGLE_POLL_DATA:
      return singlePollDataReducer(state, action)
    case CLEAR_SINGLE_POLL:
      return clearSinglePollReducer(state, action)
    default:
      return state
  }
}
