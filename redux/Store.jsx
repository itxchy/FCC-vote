const { applyMiddleware, createStore } = require('redux')
const reactRedux = require('react-redux')
const thunk = require('redux-thunk').default
const axios = require('axios')
const jwt = require('jsonwebtoken')
const { composeWithDevTools } = require('remote-redux-devtools')
const setAuthorizationToken = require('../auth/setAuthorizationToken')
import rootReducer from './rootReducer'

const composeEnhancers = composeWithDevTools({ realtime: true, port: 8000 })
const store = createStore(rootReducer, composeEnhancers(
    applyMiddleware(thunk)
  )
)

const mapStateToProps = (state) => {
  return {
    newPollTitle: state.newPollTitle,
    titleEditable: state.titleEditable,
    newPollOptions: state.newPollOptions,
    flashMessages: state.flashMessages,
    isAuthenticated: state.isAuthenticated,
    user: state.user
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setNewPollTitle (pollTitle) {
      dispatch({type: SET_NEW_POLL_TITLE, value: pollTitle})
    },
    setTitleEditable (bool) {
      dispatch({type: SET_TITLE_EDITABLE, value: bool})
    },
    updateOption (updatedOptions) {
      dispatch({type: UPDATE_OPTION, value: updatedOptions})
    },
    resetNewPoll (bool) {
      dispatch({type: RESET_NEW_POLL, value: bool})
    },
    submitNewPoll (newPoll) {
      return axios.post('/api/polls', newPoll)
    },
    getUserPolls (user) {
      return axios.get(`/api/polls/${user}`)
    },
    getAllPolls () {
      return axios.get(`/api/polls`)
    },
    submitVote (id, vote) {
      return axios.put(`/api/polls/${id}`, vote)
    },
    userSignupRequest (userData) {
      return axios.post('/api/users', userData)
    },
    isUserExists (identifier) {
      return axios.get(`/api/users/${identifier}`)
    },
    login (data) {
      return axios.post('/api/auth', data).then(res => {
        const token = res.data.token
        localStorage.setItem('jwtToken', token)
        setAuthorizationToken(token)
        const user = jwt.decode(token)
        dispatch({type: SET_CURRENT_USER, user})
      })
    },
    logout () {
      localStorage.removeItem('jwtToken')
      setAuthorizationToken(false)
      dispatch({type: SET_CURRENT_USER, user: {}})
    },
    addFlashMessage (message) {
      dispatch({type: ADD_FLASH_MESSAGE, value: message})
    },
    deleteFlashMessage (id) {
      dispatch({type: DELETE_FLASH_MESSAGE, value: id})
    }
  }
}

module.exports = { store, rootReducer, SET_CURRENT_USER }
