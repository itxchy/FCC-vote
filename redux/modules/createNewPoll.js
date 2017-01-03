export const SET_NEW_POLL_TITLE = 'setNewPollTitle'
export const SET_TITLE_EDITABLE = 'setTitleEditable'
export const UPDATE_OPTION = 'updateOption'
export const RESET_NEW_POLL = 'resetNewPoll'

export function setNewPollTitle (pollTitle) {
  return { type: SET_NEW_POLL_TITLE, value: pollTitle }
}
export function setTitleEditable (bool) {
  return { type: SET_TITLE_EDITABLE, value: bool }
}
export function updateOption (updatedOptions) {
  return { type: UPDATE_OPTION, value: updatedOptions }
}
export function resetNewPoll () {
  return { type: RESET_NEW_POLL }
}

export const reduceNewPollTitle = (state, action) => {
  const newState = {}
  Object.assign(newState, state, {newPollTitle: action.value})
  return newState
}
export const reduceTitleEditableState = (state, action) => {
  const newState = {}
  Object.assign(newState, state, {titleEditable: action.value})
  return newState
}
export const reduceOptionUpdate = (state, action) => {
  const newState = {}
  Object.assign(newState, state, {newPollOptions: action.value})
  return newState
}
export const reduceResetNewPoll = (state, action) => {
  const newState = {}
  const blankPollState = {
    newPollTitle: '',
    titleEditable: true,
    newPollOptions: [
      '',
      ''
    ]
  }
  Object.assign(newState, state, blankPollState)
  return newState
}

/**
 * Slice Reducer style
 */

export default function newPoll(state = {}, action) {
  switch (action.type) {
    case SET_NEW_POLL_TITLE:
      return reduceNewPollTitle(state, action)
    case SET_TITLE_EDITABLE:
      return reduceTitleEditableState(state, action)
    case UPDATE_OPTION:
      return reduceTitleEditableState(state, action)  
    case RESET_NEW_POLL:
      return reduceResetNewPoll(state, action)
    default:
      return state
  }
}
