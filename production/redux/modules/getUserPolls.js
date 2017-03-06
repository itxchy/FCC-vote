'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getUserPolls = getUserPolls;
exports.clearUserPolls = clearUserPolls;
exports.default = userPolls;

var _axios = require('axios');

var _axios2 = _interopRequireDefault(_axios);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Action
var USER_POLLS_DATA = 'USER_POLLS_DATA';
var CLEAR_USER_POLLS = 'CLEAR_USER_POLLS';

// Action Creators
function setUserPollsData(userPolls) {
  return { type: USER_POLLS_DATA, userPolls: userPolls };
}
function getUserPolls(username) {
  return function (dispatch) {
    _axios2.default.get('/api/polls/' + username).then(function (res) {
      console.log('getUserPolls results for', username, 'are:', res);
      if (res.data.length > 0) {
        dispatch(setUserPollsData(res.data));
      } else {
        dispatch(setUserPollsData([{ polls: null }]));
      }
    });
  };
}
function clearUserPolls() {
  return { type: CLEAR_USER_POLLS };
}

// Reducer
function reduceUserPollsData(state, action) {
  return Object.assign({}, state, { userPolls: action.userPolls });
}
function reduceClearUserPolls(state, action) {
  return Object.assign({}, state, { userPolls: null });
}

// Root Reducer
var initialState = {
  userPolls: null
};
function userPolls() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
  var action = arguments[1];

  switch (action.type) {
    case USER_POLLS_DATA:
      return reduceUserPollsData(state, action);
    case CLEAR_USER_POLLS:
      return reduceClearUserPolls(state, action);
    default:
      return state;
  }
}