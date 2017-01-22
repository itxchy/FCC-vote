import axios from 'axios'

// Action
const SINGLE_POLL_DATA = 'SINGLE_POLL_DATA'

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

// Reducer
function reduceSinglePollsData (state, action) {
  return Object.assign({}, state, { singlePoll: action.singlePoll })
}

// Root Reducer
const initialState = {
  singlePoll: null
}
export default function singlePoll (state = initialState, action) {
  switch (action.type) {
    case SINGLE_POLL_DATA:
      return reduceSinglePollsData(state, action)
    default:
      return state
  }
}
