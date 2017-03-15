'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DEFAULT_STATE = undefined;
exports.signupRequest = signupRequest;
exports.signupLoading = signupLoading;
exports.default = userSignupRequest;

var _axios = require('axios');

var _axios2 = _interopRequireDefault(_axios);

var _flashMessage = require('./flashMessage');

var _auth = require('./auth');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var DEFAULT_STATE = exports.DEFAULT_STATE = {
  signupLoading: false
};

// ******* Action Type *******

var SIGNUP_LOADING = 'SIGNUP_LOADING';

// ******* Action Creators & Reducer *******

function signupRequest(userData) {
  return function (dispatch) {
    dispatch(signupLoading(true));
    return _axios2.default.post('/api/users', userData).then(function (res) {
      dispatch((0, _flashMessage.addFlashMessage)({
        type: 'success',
        text: 'Signup successful!'
      }));
      dispatch(signupLoading(false));
      // automatically login new user
      var loginCredentials = {
        identifier: userData.email,
        password: userData.password
      };
      dispatch((0, _auth.login)(loginCredentials));
    }).catch(function (err) {
      console.error('redux: userSignupRequest.js: signup error:', err);
      dispatch((0, _flashMessage.addFlashMessage)({
        type: 'error',
        text: 'Signup failed.'
      }));
      dispatch(signupLoading(false));
    });
  };
}

/**
 * Sets state.signupLoading to true while signupReqeust is working on the API call for
 * the signup request. Once the request resolves or rejects, signupLoading gets
 * set to false.
 *
 * @param {bool} bool
 */
function signupLoading(bool) {
  return { type: SIGNUP_LOADING, signupLoading: bool };
}
function signupLoadingReducer(state, action) {
  return Object.assign({}, state, { signupLoading: action.signupLoading });
}

// ******* Root Reducer Slice *******

function userSignupRequest() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : DEFAULT_STATE;
  var action = arguments[1];

  switch (action.type) {
    case SIGNUP_LOADING:
      return signupLoadingReducer(state, action);
    default:
      return state;
  }
}