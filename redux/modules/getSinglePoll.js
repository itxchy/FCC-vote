import axios from 'axios'

// Actions
const SINGLE_POLL_DATA = 'SINGLE_POLL_DATA'
const CLEAR_SINGLE_POLL = 'CLEAR_SINGLE_POLL'

// Action Creators
function setSinglePollData (poll) {
  return { type: SINGLE_POLL_DATA, singlePoll: poll }
}

export function getSinglePoll (id) {
  return dispatch => {
    axios.get(`/api/polls/id/${id}`)
      .then(res => {
        console.log('getSinglePoll results', res.data)
        dispatch(setSinglePollData(res.data))
      })
  }
}

export function clearSinglePoll () {
  return { type: CLEAR_SINGLE_POLL }
}

// Reducers
function reduceSinglePollData (state, action) {
  return Object.assign({}, state, { singlePoll: action.singlePoll })
}
function reduceClearSinglePoll (state, action) {
  return Object.assign({}, state, { singlePoll: null })
}

// Root Reducer
const initialState = {
  singlePoll: null
}
export default function singlePoll (state = initialState, action) {
  switch (action.type) {
    case SINGLE_POLL_DATA:
      return reduceSinglePollData(state, action)
    case CLEAR_SINGLE_POLL:
      return reduceClearSinglePoll(state, action)
    default:
      return state
  }
}
