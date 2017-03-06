'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getPollData = getPollData;
exports.setEditedPoll = setEditedPoll;
exports.setPollTitle = setPollTitle;
exports.setPollOptions = setPollOptions;
exports.setTitleEditable = setTitleEditable;
exports.resetPoll = resetPoll;
exports.default = editPoll;

var _axios = require('axios');

var _axios2 = _interopRequireDefault(_axios);

var _flashMessage = require('./flashMessage');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Action
var POLL_EDITED = 'POLL_EDITED';
var ACTIVE_POLL_DATA = 'ACTIVE_POLL_DATA';
var SET_POLL_TITLE = 'SET_POLL_TITLE';
var SET_POLL_OPTIONS = 'SET_POLL_OPTIONS';
var SET_TITLE_EDITABLE = 'SET_TITLE_EDITABLE';
var RESET_POLL = 'RESET_POLL';

// Action Creators
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
      console.error('error: put request to /api/polls/edit failed:', err);
      dispatch((0, _flashMessage.addFlashMessage)({ type: 'error', text: 'Error: failed to submit edited poll' }));
    });
  };
}
function setPollTitle(pollTitle) {
  return { type: SET_POLL_TITLE, pollTitle: pollTitle };
}
function setPollOptions(pollOptions) {
  return { type: SET_POLL_OPTIONS, pollOptions: pollOptions };
}
function setTitleEditable(bool) {
  return { type: SET_TITLE_EDITABLE, titleEditable: bool };
}
function resetPoll() {
  return { type: RESET_POLL };
}
function pollEdited(editedPoll) {
  return { type: POLL_EDITED, editedPoll: editedPoll };
}
function activePollData(activePoll) {
  return { type: ACTIVE_POLL_DATA, activePollData: activePoll };
}

// Reducers
function reducePollEdited(state, action) {
  return Object.assign({}, state, { editedPoll: action.editedPoll });
}
function reduceActivePollData(state, action) {
  return Object.assign({}, state, { activePollData: action.activePollData });
}
function reduceSetPollTitle(state, action) {
  return Object.assign({}, state, { newPollTitle: action.pollTitle });
}
function reduceSetPollOptions(state, action) {
  return Object.assign({}, state, { newPollOptions: action.pollOptions });
}
function reduceResetPoll(state, action) {
  return Object.assign({}, state, {
    newPollTitle: '',
    titleEditable: true,
    newPollOptions: ['', ''],
    editedPoll: null,
    activePollData: null
  });
}

// Root Reducer Slice
var initialState = {
  newPollTitle: '',
  titleEditable: true,
  newPollOptions: ['', ''],
  editedPoll: null,
  activePollData: null
};
function editPoll() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
  var action = arguments[1];

  switch (action.type) {
    case POLL_EDITED:
      return reducePollEdited(state, action);
    case ACTIVE_POLL_DATA:
      return reduceActivePollData(state, action);
    case SET_POLL_TITLE:
      return reduceSetPollTitle(state, action);
    case SET_POLL_OPTIONS:
      return reduceSetPollOptions(state, action);
    case RESET_POLL:
      return reduceResetPoll(state, action);
    default:
      return state;
  }
}