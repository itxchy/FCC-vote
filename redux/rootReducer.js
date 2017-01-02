import {
  ADD_FLASH_MESSAGE,
  DELETE_FLASH_MESSAGE,
  reduceAddFlashMessage,
  reduceDeleteFlashMessage
} from './modules/flashMessage'

import {
  SET_NEW_POLL_TITLE,
  SET_TITLE_EDITABLE,
  UPDATE_OPTION,
  RESET_NEW_POLL,
  reduceNewPollTitle,
  reduceTitleEditableState,
  reduceOptionUpdate,
  reduceResetNewPoll
} from './modules/createNewPoll'

import {
  SET_CURRENT_USER,
  reduceSetCurrentUser
} from './modules/auth'

const initialState = {
  newPollTitle: '',
  titleEditable: true,
  newPollOptions: [
    '',
    ''
  ],
  flashMessages: [],
  isAuthenticated: false,
  user: {}
}

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_NEW_POLL_TITLE:
      return reduceNewPollTitle(state, action)
    case SET_TITLE_EDITABLE:
      return reduceTitleEditableState(state, action)
    case UPDATE_OPTION:
      return reduceOptionUpdate(state, action)
    case RESET_NEW_POLL:
      return reduceResetNewPoll(state, action)
    case ADD_FLASH_MESSAGE:
      return reduceAddFlashMessage(state, action)
    case DELETE_FLASH_MESSAGE:
      return reduceDeleteFlashMessage(state, action)
    case SET_CURRENT_USER:
      return reduceSetCurrentUser(state, action)
    default:
      return state
  }
}

export default rootReducer
