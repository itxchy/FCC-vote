'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DEFAULT_STATE = undefined;
exports.getUserPolls = getUserPolls;
exports.setUserPollsData = setUserPollsData;
exports.clearUserPolls = clearUserPolls;
exports.default = userPolls;

var _axios = require('axios');

var _axios2 = _interopRequireDefault(_axios);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var DEFAULT_STATE = exports.DEFAULT_STATE = {
  userPolls: null
};

// ******* Action Types *******

var USER_POLLS_DATA = 'USER_POLLS_DATA';
var CLEAR_USER_POLLS = 'CLEAR_USER_POLLS';

// ******* Action Creators & Reducers *******

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

/**
 * Sets state.userPolls as an array of a user's poll objects
 *
 * @param {array} userPolls
 */
function setUserPollsData(userPolls) {
  return { type: USER_POLLS_DATA, userPolls: userPolls };
}
function userPollsDataReducer(state, action) {
  return Object.assign({}, state, { userPolls: action.userPolls });
}

/**
 * Sets state.userPolls back to null
 */
function clearUserPolls() {
  return { type: CLEAR_USER_POLLS };
}
function clearUserPollsReducer(state, action) {
  return Object.assign({}, state, DEFAULT_STATE);
}

// ******* Root Reducer Slice *******

function userPolls() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : DEFAULT_STATE;
  var action = arguments[1];

  switch (action.type) {
    case USER_POLLS_DATA:
      return userPollsDataReducer(state, action);
    case CLEAR_USER_POLLS:
      return clearUserPollsReducer(state, action);
    default:
      return state;
  }
}