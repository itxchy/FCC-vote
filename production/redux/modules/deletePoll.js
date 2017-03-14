'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DEFAULT_STATE = undefined;
exports.deletePoll = deletePoll;
exports.pollDeleted = pollDeleted;
exports.resetDeletedPoll = resetDeletedPoll;
exports.default = deletedPoll;

var _axios = require('axios');

var _axios2 = _interopRequireDefault(_axios);

var _flashMessage = require('./flashMessage');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var DEFAULT_STATE = exports.DEFAULT_STATE = {
  deletedPoll: null
};

// ******* Action Types *******

var POLL_DELETED = 'POLL_DELETED';
var RESET_DELETED_POLL = 'RESET_DELETED_POLL';

// ******* Action Creators & Reducers *******

function deletePoll(id) {
  return function (dispatch) {
    _axios2.default.delete('/api/polls/delete/' + id).then(function (res) {
      if (res.data.hasOwnProperty('ok') && res.data.ok) {
        dispatch((0, _flashMessage.addFlashMessage)({ type: 'success', text: 'Poll deleted!' }));
        dispatch(pollDeleted(id));
      } else {
        console.error('error: delete response from /api/polls/delete not ok', res.data);
        dispatch((0, _flashMessage.addFlashMessage)({ type: 'error', text: 'Failed to delete poll. That\'s an error.' }));
      }
    }).catch(function (err) {
      console.error('error: delete request to /api/polls/delete failed', err);
      dispatch((0, _flashMessage.addFlashMessage)({ type: 'error', text: 'Failed to delete poll. That\'s an error.' }));
    });
  };
}

/**
 * Sets state.deletedPoll as the just-deleted poll's id
 *
 * @param {string} id - poll id of deleted poll
 */
function pollDeleted(id) {
  return {
    type: POLL_DELETED,
    pollId: id
  };
}
var pollDeletedReducer = function pollDeletedReducer(state, action) {
  return Object.assign({}, state, { deletedPoll: action.pollId });
};

/**
 * Sets state.deletedPoll as null
 */
function resetDeletedPoll() {
  return {
    type: RESET_DELETED_POLL
  };
}
var resetDeletedPollReducer = function resetDeletedPollReducer(state, action) {
  return Object.assign({}, state, DEFAULT_STATE);
};

// ******* Root Reducer Slice *******

function deletedPoll() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : DEFAULT_STATE;
  var action = arguments[1];

  switch (action.type) {
    case POLL_DELETED:
      return pollDeletedReducer(state, action);
    case RESET_DELETED_POLL:
      return resetDeletedPollReducer(state, action);
    default:
      return state;
  }
}