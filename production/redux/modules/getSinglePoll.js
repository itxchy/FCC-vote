'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getSinglePoll = getSinglePoll;
exports.clearSinglePoll = clearSinglePoll;
exports.default = singlePoll;

var _axios = require('axios');

var _axios2 = _interopRequireDefault(_axios);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Actions
var SINGLE_POLL_DATA = 'SINGLE_POLL_DATA';
var CLEAR_SINGLE_POLL = 'CLEAR_SINGLE_POLL';

// Action Creators
function setSinglePollData(poll) {
  return { type: SINGLE_POLL_DATA, singlePoll: poll };
}

function getSinglePoll(id) {
  return function (dispatch) {
    _axios2.default.get('/api/polls/id/' + id).then(function (res) {
      console.log('getSinglePoll results', res.data);
      dispatch(setSinglePollData(res.data));
    });
  };
}

function clearSinglePoll() {
  return { type: CLEAR_SINGLE_POLL };
}

// Reducers
function reduceSinglePollData(state, action) {
  return Object.assign({}, state, { singlePoll: action.singlePoll });
}
function reduceClearSinglePoll(state, action) {
  return Object.assign({}, state, { singlePoll: null });
}

// Root Reducer
var initialState = {
  singlePoll: null
};
function singlePoll() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
  var action = arguments[1];

  switch (action.type) {
    case SINGLE_POLL_DATA:
      return reduceSinglePollData(state, action);
    case CLEAR_SINGLE_POLL:
      return reduceClearSinglePoll(state, action);
    default:
      return state;
  }
}