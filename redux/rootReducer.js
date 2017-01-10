import { combineReducers } from 'redux'
import flashMessages from './modules/flashMessage'
import newPoll from './modules/createNewPoll'
import user from './modules/auth'
import allPolls from './modules/getAllPolls'
import newVote from './modules/submitVote'
import dupeUserCheck from './modules/isUserExists'

export default combineReducers({
  flashMessages,
  newPoll,
  user,
  allPolls,
  newVote,
  dupeUserCheck
})
