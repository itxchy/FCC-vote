const redux = require('redux')
const reactRedux = require('react-redux')

const SET_NEW_POLL_TITLE = 'setNewPollTitle'
const SET_TITLE_EDITABLE = 'setTitleEditable'

const initialState = {
  newPollTitle: '',
  titleEditable: true
}

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_NEW_POLL_TITLE:
      return reduceNewPollTitle(state, action)
    case SET_TITLE_EDITABLE:
      return reduceTitleEditableState(state, action)
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

const store = redux.createStore(rootReducer)

const mapStateToProps = (state) => {
  return {
    newPollTitle: state.newPollTitle,
    titleEditable: state.titleEditable
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setNewPollTitle (pollTitle) {
      dispatch({type: SET_NEW_POLL_TITLE, value: pollTitle})
    },
    setTitleEditable (bool) {
      dispatch({type: SET_TITLE_EDITABLE, value: bool})
    }
  }
}

const connector = reactRedux.connect(mapStateToProps, mapDispatchToProps)

module.exports = { connector, store, rootReducer }
