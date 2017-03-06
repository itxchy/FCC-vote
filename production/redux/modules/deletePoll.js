'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.deletePoll = deletePoll;
exports.resetDeletedPoll = resetDeletedPoll;
exports.default = deletedPoll;

var _axios = require('axios');

var _axios2 = _interopRequireDefault(_axios);

var _flashMessage = require('./flashMessage');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Action
var POLL_DELETED = 'POLL_DELETED';
var RESET_DELETED_POLL = 'RESET_DELETED_POLL';

// Action Creators
function deletePoll(id) {
  console.log('deleting:', id);
  return function (dispatch) {
    _axios2.default.delete('/api/polls/delete/' + id).then(function (res) {
      console.log('delete response:', res);
      // redirect home
      dispatch((0, _flashMessage.addFlashMessage)({ type: 'success', text: 'Poll deleted!' }));
      dispatch(pollDeleted(id));
    }).catch(function (err) {
      console.error('error: delete request to /api/polls/delete failed', err);
      dispatch((0, _flashMessage.addFlashMessage)({ type: 'error', text: 'Failed to delete poll. That\'s an error.' }));
    });
  };
}
function pollDeleted(id) {
  return {
    type: POLL_DELETED,
    pollId: id
  };
}
function resetDeletedPoll() {
  return {
    type: RESET_DELETED_POLL
  };
}

// Reducer
var reducePollDeleted = function reducePollDeleted(state, action) {
  return Object.assign({}, state, { deletedPoll: action.pollId });
};
var reduceResetDeletedPoll = function reduceResetDeletedPoll(state, action) {
  return Object.assign({}, state, { deletedPoll: null });
};

// Root Reducer Slice
var initialState = {
  deletedPoll: null
};
function deletedPoll() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
  var action = arguments[1];

  switch (action.type) {
    case POLL_DELETED:
      return reducePollDeleted(state, action);
    case RESET_DELETED_POLL:
      return reduceResetDeletedPoll(state, action);
    default:
      return state;
  }
}