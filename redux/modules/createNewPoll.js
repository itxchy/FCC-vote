export SET_NEW_POLL_TITLE = 'setNewPollTitle'
export SET_TITLE_EDITABLE = 'setTitleEditable'
export UPDATE_OPTION = 'updateOption'
export RESET_NEW_POLL = 'resetNewPoll'

export function setNewPollTitle (pollTitle) {
  return { type: SET_NEW_POLL_TITLE, value: pollTitle }
}
export function setTitleEditable (bool) {
  return { type: SET_TITLE_EDITABLE, value: bool }
}
export function updateOption (updatedOptions) {
  return { type: UPDATE_OPTION, value: updatedOptions }
}
export function resetNewPoll (bool) {
  return { type: RESET_NEW_POLL, value: bool }
}

export reduceNewPollTitle = (state, action) => {
  const newState = {}
  Object.assign(newState, state, {newPollTitle: action.value})
  return newState
}
export reduceTitleEditableState = (state, action) => {
  const newState = {}
  Object.assign(newState, state, {titleEditable: action.value})
  return newState
}
export reduceOptionUpdate = (state, action) => {
  const newState = {}
  Object.assign(newState, state, {newPollOptions: action.value})
  return newState
}
export reduceResetNewPoll = (state, action) => {
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
