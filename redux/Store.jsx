const { applyMiddleware, createStore } = require('redux')
const reactRedux = require('react-redux')
const thunk = require('redux-thunk').default
const axios = require('axios')
const shortid = require('shortid')
const findIndex = require('lodash/findIndex')
const loMap = require('lodash/map')
const clone = require('lodash/clone')
const { composeWithDevTools } = require('remote-redux-devtools')

const SET_NEW_POLL_TITLE = 'setNewPollTitle'
const SET_TITLE_EDITABLE = 'setTitleEditable'

const UPDATE_OPTION = 'updateOption'
const RESET_NEW_POLL = 'resetNewPoll'

const ADD_FLASH_MESSAGE = 'addFlashMessage'
const DELETE_FLASH_MESSAGE = 'DELETE_FLASH_MESSAGE'

const initialState = {
  newPollTitle: '',
  titleEditable: true,
  newPollOptions: [
    '',
    ''
  ],
  flashMessages: []
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
    default:
      return state
  }
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
    flashMessages: state.flashMessages
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
    userSignupRequest (userData) {
      return axios.post('/api/users', userData)
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

module.exports = { connector, store, rootReducer }
