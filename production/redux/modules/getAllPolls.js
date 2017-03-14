'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DEFAULT_STATE = undefined;
exports.getAllPolls = getAllPolls;
exports.pollsData = pollsData;
exports.default = allPolls;

var _axios = require('axios');

var _axios2 = _interopRequireDefault(_axios);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var DEFAULT_STATE = exports.DEFAULT_STATE = {
  allPolls: null
};

// ******* Action Type *******

var ALL_POLLS_DATA = 'ALL_POLLS_DATA';

// ******* Action Creators & Reducer *******

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

/**
 * Sets state.allPolls
 *
 * @param {array} res - An array of poll objects
 */
function pollsData(res) {
  console.log('pollsData res', res);
  return {
    type: ALL_POLLS_DATA,
    allPolls: res
  };
}
var allPollsDataReducer = function allPollsDataReducer(state, action) {
  var newState = {};
  Object.assign(newState, state, { allPolls: action.allPolls });
  return newState;
};

// ******* Root Reducer Slice *******

function allPolls() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : DEFAULT_STATE;
  var action = arguments[1];

  switch (action.type) {
    case ALL_POLLS_DATA:
      return allPollsDataReducer(state, action);
    default:
      return state;
  }
}