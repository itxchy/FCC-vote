import { combineReducers } from 'redux'
import flashMessages from './modules/flashMessage'
import newPoll from './modules/createNewPoll'
import user from './modules/auth'
import allPolls from './modules/getAllPolls'

// const initialState = {
//   newPollTitle: '',
//   titleEditable: true,
//   newPollOptions: [
//     '',
//     ''
//   ],
//   flashMessages: [],
//   isAuthenticated: false,
//   user: {},
//   allPolls: null
// }

// const rootReducer = (state = initialState, action) => {
//   switch (action.type) {
//     case ALL_POLLS_DATA:
//       return reduceAllPollsData(state, action)
//     case SET_NEW_POLL_TITLE:
//       return reduceNewPollTitle(state, action)
//     case SET_TITLE_EDITABLE:
//       return reduceTitleEditableState(state, action)
//     case UPDATE_OPTION:
//       return reduceOptionUpdate(state, action)
//     case RESET_NEW_POLL:
//       return reduceResetNewPoll(state, action)
//     case ADD_FLASH_MESSAGE:
//       return reduceAddFlashMessage(state, action)
//     case DELETE_FLASH_MESSAGE:
//       return reduceDeleteFlashMessage(state, action)
//     case SET_CURRENT_USER:
//       return reduceSetCurrentUser(state, action)
//     default:
//       return state
//   }
// }

export default combineReducers({
  flashMessages,
  newPoll,
  user,
  allPolls
})
