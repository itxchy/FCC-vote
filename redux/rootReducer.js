import { combineReducers } from 'redux'
import flashMessages from './modules/flashMessage'
import newPoll from './modules/createNewPoll'
import user from './modules/auth'
import allPolls from './modules/getAllPolls'
import newVote from './modules/submitVote'
import clientFormValidation from './modules/clientFormValidation'
import userSignupRequest from './modules/userSignupRequest'
import userPolls from './modules/getUserPolls'

export default combineReducers({
  flashMessages,
  newPoll,
  user,
  allPolls,
  newVote,
  clientFormValidation,
  userSignupRequest,
  userPolls
})
