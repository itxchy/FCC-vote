import { combineReducers } from 'redux'
import flashMessages from './modules/flashMessage'
import newPoll from './modules/createNewPoll'
import user from './modules/auth'
import allPolls from './modules/getAllPolls'
import handleNewVote from './modules/submitVote'

export default combineReducers({
  flashMessages,
  newPoll,
  user,
  allPolls,
  handleNewVote
})
