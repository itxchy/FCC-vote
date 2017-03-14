'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DEFAULT_STATE = undefined;
exports.getSinglePoll = getSinglePoll;
exports.setSinglePollData = setSinglePollData;
exports.clearSinglePoll = clearSinglePoll;
exports.default = singlePoll;

var _axios = require('axios');

var _axios2 = _interopRequireDefault(_axios);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var DEFAULT_STATE = exports.DEFAULT_STATE = {
  singlePoll: null
};

// ******* Action Types *******

var SINGLE_POLL_DATA = 'SINGLE_POLL_DATA';
var CLEAR_SINGLE_POLL = 'CLEAR_SINGLE_POLL';

// ******* Action Creators & Reducers *******

function getSinglePoll(id) {
  return function (dispatch) {
    _axios2.default.get('/api/polls/id/' + id).then(function (res) {
      dispatch(setSinglePollData(res.data));
    });
  };
}

/**
 * Sets state.singlePoll with a single poll object in an array
 *
 * @param {array} poll - an array with one element, a poll object
 */
function setSinglePollData(poll) {
  return { type: SINGLE_POLL_DATA, singlePoll: poll };
}
function singlePollDataReducer(state, action) {
  return Object.assign({}, state, { singlePoll: action.singlePoll });
}

/**
 * Sets state.singlePoll back to null
 */
function clearSinglePoll() {
  return { type: CLEAR_SINGLE_POLL };
}
function clearSinglePollReducer(state, action) {
  return Object.assign({}, state, DEFAULT_STATE);
}

// ******* Root Reducer Slice *******

function singlePoll() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : DEFAULT_STATE;
  var action = arguments[1];

  switch (action.type) {
    case SINGLE_POLL_DATA:
      return singlePollDataReducer(state, action);
    case CLEAR_SINGLE_POLL:
      return clearSinglePollReducer(state, action);
    default:
      return state;
  }
}