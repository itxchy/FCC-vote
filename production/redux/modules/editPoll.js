'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DEFAULT_STATE = undefined;
exports.getPollData = getPollData;
exports.setEditedPoll = setEditedPoll;
exports.setPollTitle = setPollTitle;
exports.setPollOptions = setPollOptions;
exports.setTitleEditable = setTitleEditable;
exports.resetPoll = resetPoll;
exports.pollEdited = pollEdited;
exports.activePollData = activePollData;
exports.default = editPoll;

var _axios = require('axios');

var _axios2 = _interopRequireDefault(_axios);

var _flashMessage = require('./flashMessage');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var DEFAULT_STATE = exports.DEFAULT_STATE = {
  newPollTitle: '',
  titleEditable: true,
  newPollOptions: ['', ''],
  editedPoll: null,
  activePollData: null
};

// ******* Action Types *******

var POLL_EDITED = 'POLL_EDITED';
var ACTIVE_POLL_DATA = 'ACTIVE_POLL_DATA';
var SET_POLL_TITLE = 'SET_POLL_TITLE';
var SET_POLL_OPTIONS = 'SET_POLL_OPTIONS';
var SET_TITLE_EDITABLE = 'SET_TITLE_EDITABLE';
var RESET_POLL = 'RESET_POLL';

// ******* Action Creators & Reducers *******

function getPollData(id) {
  return function (dispatch) {
    _axios2.default.get('/api/polls/id/' + id).then(function (res) {
      var poll = res.data[0];
      var options = poll.options.map(function (option) {
        return option.option;
      });
      dispatch(setPollTitle(poll.title));
      dispatch(setPollOptions(options));
      dispatch(activePollData(res.data[0]));
    });
  };
}

function setEditedPoll(id, pollData) {
  return function (dispatch) {
    _axios2.default.put('/api/polls/edit/' + id, pollData).then(function (res) {
      var editedPoll = res.data.updatedDoc;
      dispatch(pollEdited(editedPoll));
      // dispatch reset setNewTitle
      // dispatch dispatch setPollOptions
    }).catch(function (err) {
      console.error('redux: editPoll.js: setEditedPoll failed', err);
      dispatch((0, _flashMessage.addFlashMessage)({ type: 'error', text: 'Error: failed to submit edited poll' }));
    });
  };
}

/**
 * Sets state.newPollTitle from a change event in the title's text area
 *
 * @param {string} pollTitle - A new poll's title
 */
function setPollTitle(pollTitle) {
  return { type: SET_POLL_TITLE, pollTitle: pollTitle };
}
function setPollTitleReducer(state, action) {
  return Object.assign({}, state, { newPollTitle: action.pollTitle });
}

/**
 * Sets state.newPollOptions as a new poll options array from adding/editing/deleting options
 *
 * @param {array} pollOptions - A new poll options array
 */
function setPollOptions(pollOptions) {
  return { type: SET_POLL_OPTIONS, pollOptions: pollOptions };
}
function setPollOptionsReducer(state, action) {
  return Object.assign({}, state, { newPollOptions: action.pollOptions });
}

/**
 * Sets state.setTitleEditable
 *
 * @param {bool} bool
 */
function setTitleEditable(bool) {
  return { type: SET_TITLE_EDITABLE, titleEditable: bool };
}
function setTitleEditableReducer(state, action) {
  return Object.assign({}, state, { titleEditable: action.titleEditable });
}

/**
 * Resets the poll to two blank options
 */
function resetPoll() {
  return { type: RESET_POLL };
}
function resetPollReducer(state, action) {
  return Object.assign({}, state, DEFAULT_STATE);
}

/**
 * Sets state.editedPoll as the edited poll object.
 * This allows EditPoll.jsx to redirect to the edited poll's page upon
 * receiving this object.
 *
 * @param {object} editedPoll
 */
function pollEdited(editedPoll) {
  return { type: POLL_EDITED, editedPoll: editedPoll };
}
function pollEditedReducer(state, action) {
  return Object.assign({}, state, { editedPoll: action.editedPoll });
}

/**
 * Sets state.activePollData
 *
 * @param {object} activePoll - the initial data of the poll being edited
 */
function activePollData(activePoll) {
  return { type: ACTIVE_POLL_DATA, activePollData: activePoll };
}
function activePollDataReducer(state, action) {
  return Object.assign({}, state, { activePollData: action.activePollData });
}

// ******* Root Reducer Slice *******

function editPoll() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : DEFAULT_STATE;
  var action = arguments[1];

  switch (action.type) {
    case POLL_EDITED:
      return pollEditedReducer(state, action);
    case ACTIVE_POLL_DATA:
      return activePollDataReducer(state, action);
    case SET_POLL_TITLE:
      return setPollTitleReducer(state, action);
    case SET_POLL_OPTIONS:
      return setPollOptionsReducer(state, action);
    case RESET_POLL:
      return resetPollReducer(state, action);
    case SET_TITLE_EDITABLE:
      return setTitleEditableReducer(state, action);
    default:
      return state;
  }
}