import { combineReducers } from 'redux'
import flashMessages from './modules/flashMessage'
import newPoll from './modules/createNewPoll'
import user from './modules/auth'
import allPolls from './modules/getAllPolls'
import newVote from './modules/submitVote'
import clientFormValidation from './modules/clientFormValidation'
import userSignupRequest from './modules/userSignupRequest'
import userPolls from './modules/getUserPolls'
import singlePoll from './modules/getSinglePoll'
import editPoll from './modules/editPoll'
import deletedPoll from './modules/deletePoll'

export default combineReducers({
  flashMessages,
  newPoll,
  user,
  allPolls,
  newVote,
  clientFormValidation,
  userSignupRequest,
  userPolls,
  singlePoll,
  editPoll,
  deletedPoll
})
