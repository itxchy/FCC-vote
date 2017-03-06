'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.reduceAllPollsData = exports.ALL_POLLS_DATA = undefined;
exports.pollsData = pollsData;
exports.getAllPolls = getAllPolls;
exports.default = allPolls;

var _axios = require('axios');

var _axios2 = _interopRequireDefault(_axios);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Action
var ALL_POLLS_DATA = exports.ALL_POLLS_DATA = 'ALL_POLLS_DATA';

// Action Creators
function pollsData(res) {
  return {
    type: ALL_POLLS_DATA,
    allPolls: res
  };
}
function getAllPolls() {
  return function (dispatch) {
    _axios2.default.get('/api/polls').then(function (res) {
      if (res.data.length > 0) {
        dispatch(pollsData(res.data));
      } else {
        dispatch(pollsData(false));
      }
    });
  };
}

// Reducer
var reduceAllPollsData = exports.reduceAllPollsData = function reduceAllPollsData(state, action) {
  var newState = {};
  Object.assign(newState, state, { allPolls: action.allPolls });
  return newState;
};

var initialState = {
  allPolls: null
};

// Root Reducer Slice
function allPolls() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
  var action = arguments[1];

  switch (action.type) {
    case ALL_POLLS_DATA:
      return reduceAllPollsData(state, action);
    default:
      return state;
  }
}