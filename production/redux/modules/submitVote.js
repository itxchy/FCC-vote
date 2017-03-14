'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DEFAULT_STATE = undefined;
exports.submitVote = submitVote;
exports.updatedPollResults = updatedPollResults;
exports.resetUpdatedPollResults = resetUpdatedPollResults;
exports.default = newVote;

var _axios = require('axios');

var _axios2 = _interopRequireDefault(_axios);

var _has = require('lodash/has');

var _has2 = _interopRequireDefault(_has);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var DEFAULT_STATE = exports.DEFAULT_STATE = {
  updatedResults: null
};

// ******* Action Types *******

var UPDATED_POLL_RESULTS = 'UPDATED_POLL_RESULTS';
var RESET_UPDATED_POLL_RESULTS = 'RESET_UPDATED_POLL_RESULTS';

// ******* Action Creators & Reducers *******

/**
 * @param id = string,
 * @param vote = object {selectedOption, voter}
 *
 * Dispatches a new vote request to the the database.
 *
 * If the voter already voted on the current poll,
 * {dupeVoter: true} is returned.
 * If the vote is unique, the new, updated poll object
 * is returned. Otherwise, a server error object is returned.
 */
function submitVote(id, vote) {
  return function (dispatch) {
    _axios2.default.put('/api/polls/' + id, vote).then(function (res) {
      // console.log('New, unique vote successful in submitVote!', res)
      var results = res.data.totalVotes;
      dispatch(updatedPollResults(results));
    }).catch(function (err) {
      if ((0, _has2.default)(err.response.data, 'dupeVoter') && err.response.data.dupeVoter === true) {
        console.log('dupeVoter detected!:', err.response.data.dupeVoter);
      }
      if ((0, _has2.default)(err.response.data, 'error')) {
        console.error('submitVote server error:', err.response.data.error);
      }
    });
  };
}

/**
 * Sets state.updatedResults as a poll object of the newly updated poll
 *
 * @param {object} results
 */
function updatedPollResults(results) {
  return { type: UPDATED_POLL_RESULTS, results: results };
}
function updatedPollResultsReducer(state, action) {
  return Object.assign({}, state, { updatedResults: action.results });
}

/**
 * Resets state.updatedResults to null
 */
function resetUpdatedPollResults() {
  return { type: RESET_UPDATED_POLL_RESULTS };
}
function resetUpdatedPollResultsReducer(state, action) {
  var newState = {};
  Object.assign(newState, state, DEFAULT_STATE);
  return newState;
}

// ******* Root Reducer Slice *******

function newVote() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : DEFAULT_STATE;
  var action = arguments[1];

  switch (action.type) {
    case UPDATED_POLL_RESULTS:
      return updatedPollResultsReducer(state, action);
    case RESET_UPDATED_POLL_RESULTS:
      return resetUpdatedPollResultsReducer(state, action);
    default:
      return state;
  }
}