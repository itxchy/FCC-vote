/* global localStorage */

const { applyMiddleware, createStore } = require('redux')
const reactRedux = require('react-redux')
const thunk = require('redux-thunk').default
const axios = require('axios')
const shortid = require('shortid')
const findIndex = require('lodash/findIndex')
const loMap = require('lodash/map')
const clone = require('lodash/clone')
const isEmpty = require('lodash/isEmpty')
const jwt = require('jsonwebtoken')
const { composeWithDevTools } = require('remote-redux-devtools')
const setAuthorizationToken = require('../auth/setAuthorizationToken')

const SET_NEW_POLL_TITLE = 'setNewPollTitle'
const SET_TITLE_EDITABLE = 'setTitleEditable'

const UPDATE_OPTION = 'updateOption'
const RESET_NEW_POLL = 'resetNewPoll'

const ADD_FLASH_MESSAGE = 'addFlashMessage'
const DELETE_FLASH_MESSAGE = 'DELETE_FLASH_MESSAGE'

const SET_CURRENT_USER = 'setCurrentUser'

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

const reduceSetCurrentUser = (state, action) => {
  const newState = {}
  console.log('action.user', action.user)
  Object.assign(newState, state, {
    isAuthenticated: !isEmpty(action.user),
    user: action.user
  })
  return newState
}

const reduceNewPollTitle = (state, action) => {
  const newState = {}
  Object.assign(newState, state, {newPollTitle: action.value})
  return newState
}

const reduceTitleEditableState = (state, action) => {
  const newState = {}
  Object.assign(newState, state, {titleEditable: action.value})
  return newState
}

const reduceOptionUpdate = (state, action) => {
  const newState = {}
  Object.assign(newState, state, {newPollOptions: action.value})
  return newState
}

const reduceAddFlashMessage = (state, action) => {
  const newState = {}

  Object.assign(newState, state, {
    flashMessages: [
      ...state.flashMessages,
      {
        id: shortid.generate(),
        messageType: action.value.type,
        messageText: action.value.text
      }
    ]
  })
  return newState
}

const reduceDeleteFlashMessage = (state, action) => {
  const newState = {}

  const index = findIndex(state.flashMessages, {id: action.value})

  if (index >= 0) {
    // makes a clone of state.flashMessages to be mutated
    let newFlashMessages = loMap(state.flashMessages, clone)

    newFlashMessages.splice(index, 1)
    Object.assign(newState, state, {
      flashMessages: newFlashMessages
    })
    return newState
  }

  return state
}

const reduceResetNewPoll = (state, action) => {
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

const connector = reactRedux.connect(mapStateToProps, mapDispatchToProps)

module.exports = { connector, store, rootReducer, SET_CURRENT_USER }
