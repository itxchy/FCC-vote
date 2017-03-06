'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DEFAULT_STATE = undefined;
exports.setNewPollTitle = setNewPollTitle;
exports.setTitleEditable = setTitleEditable;
exports.updateOption = updateOption;
exports.resetNewPoll = resetNewPoll;
exports.pollSaved = pollSaved;
exports.resetPollSaved = resetPollSaved;
exports.submitNewPoll = submitNewPoll;
exports.default = newPoll;

var _axios = require('axios');

var _axios2 = _interopRequireDefault(_axios);

var _flashMessage = require('./flashMessage');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var DEFAULT_STATE = exports.DEFAULT_STATE = {
  newPollTitle: '',
  titleEditable: true,
  newPollOptions: ['', ''],
  pollSaved: null
};

// ******* Action Types *******

var SET_NEW_POLL_TITLE = 'SET_NEW_POLL_TITLE';
var SET_NEW_TITLE_EDITABLE = 'SET_NEW_TITLE_EDITABLE';
var UPDATE_OPTION = 'UPDATE_OPTION';
var RESET_NEW_POLL = 'RESET_NEW_POLL';
var POLL_SAVED = 'POLL_SAVED';
var RESET_POLL_SAVED = 'RESET_POLL_SAVED';

// ******* Action Creators & Reducers*******

/**
 * Sets state.newPollTitle
 *
 * @param {string} pollTitle
 */
function setNewPollTitle(pollTitle) {
  return { type: SET_NEW_POLL_TITLE, value: pollTitle };
}
var setNewPollTitleReducer = function setNewPollTitleReducer(state, action) {
  if (typeof action.value !== 'string') {
    console.error('ERROR: redux: setNewPollTitle wasn\'t passed a string:', action.value);
    return Object.assign({}, state);
  }
  return Object.assign({}, state, { newPollTitle: action.value });
};
/**
 * Sets state.titleEditable
 *
 * @param {boolean} bool
 */
function setTitleEditable(bool) {
  return { type: SET_NEW_TITLE_EDITABLE, value: bool };
}
var setTitleEditableReducer = function setTitleEditableReducer(state, action) {
  if (typeof action.value !== 'boolean') {
    console.error('ERROR: redux: setTitleEditable was not passed a boolean:', action.value);
    return Object.assign({}, state, { titleEditable: true });
  }
  return Object.assign({}, state, { titleEditable: action.value });
};
/**
 * Sets state.newPollOptions
 *
 * @param {array} updatedOptions - An array of at least 2 strings
 */
function updateOption(updatedOptions) {
  return { type: UPDATE_OPTION, value: updatedOptions };
}
var updateOptionReducer = function updateOptionReducer(state, action) {
  if (action.value.length < 2) {
    console.error('ERROR: redux: less than two options were passed to updateOption:', action.value);
    return Object.assign({}, state);
  }
  return Object.assign({}, state, { newPollOptions: action.value });
};
/**
 * Resets state to DEFAULT_STATE
 */
function resetNewPoll() {
  return { type: RESET_NEW_POLL };
}
var resetNewPollReducer = function resetNewPollReducer(state, action) {
  var newState = {};
  var blankPollState = DEFAULT_STATE;
  Object.assign(newState, state, blankPollState);
  return newState;
};
/**
 * Sets state.pollSaved as a new Poll's ID
 *
 * @param {string} pollId - A new poll's mongoDB _id
 */
function pollSaved(pollId) {
  return { type: POLL_SAVED, pollId: pollId };
}
var pollSavedReducer = function pollSavedReducer(state, action) {
  if (typeof action.pollId !== 'string') {
    console.error('ERROR: redux: pollSaved was not passed an id as a string:', action.pollId);
    return Object.assign({}, state, { pollSaved: false });
  }
  return Object.assign({}, state, { pollSaved: action.pollId });
};
/**
 * Sets state.pollSaved as null
 */
function resetPollSaved() {
  return { type: RESET_POLL_SAVED };
}
var resetPollSavedReducer = function resetPollSavedReducer(state, action) {
  return Object.assign({}, state, { pollSaved: null });
};
/**
 * Submits a new poll to the server
 *
 * @param {object} newPoll - an object containing a new poll's title, at least two
 * options, and the owner (user). Sample: { title: 'What number?', options: ['one', 'two'], owner: 'Lloyd'}
 *
 */
function submitNewPoll(newPoll) {
  return function (dispatch) {
    _axios2.default.post('/api/polls', newPoll).then(function (res) {
      console.log('newPoll submitted successfully!', res.data.poll._id);
      dispatch(resetNewPoll());
      dispatch((0, _flashMessage.addFlashMessage)({ type: 'success', text: 'Poll saved!' }));
      dispatch(pollSaved(res.data.poll._id));
    }).catch(function (err) {
      console.error('ERROR: redux: newPoll could not be saved', err);
      dispatch((0, _flashMessage.addFlashMessage)({ type: 'error', text: 'Something went wrong. Poll coudn\'t be saved.' }));
    });
  };
}

// ******* Root Reducer Slice *******

function newPoll() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : DEFAULT_STATE;
  var action = arguments[1];

  switch (action.type) {
    case SET_NEW_POLL_TITLE:
      return setNewPollTitleReducer(state, action);
    case SET_NEW_TITLE_EDITABLE:
      return setTitleEditableReducer(state, action);
    case UPDATE_OPTION:
      return updateOptionReducer(state, action);
    case RESET_NEW_POLL:
      return resetNewPollReducer(state, action);
    case POLL_SAVED:
      return pollSavedReducer(state, action);
    case RESET_POLL_SAVED:
      return resetPollSavedReducer(state, action);
    default:
      return state;
  }
}