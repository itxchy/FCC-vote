'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.signupLoading = signupLoading;
exports.signupRequest = signupRequest;
exports.default = userSignupRequest;

var _axios = require('axios');

var _axios2 = _interopRequireDefault(_axios);

var _flashMessage = require('./flashMessage');

var _auth = require('./auth');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// action
var SIGNUP_LOADING = 'SIGNUP_LOADING';

// action creator
function signupLoading(bool) {
  return { type: SIGNUP_LOADING, signupLoading: bool };
}
function signupRequest(userData) {
  return function (dispatch) {
    dispatch(signupLoading(true));
    console.log('userSignupRequest: userData', userData);
    return _axios2.default.post('/api/users', userData).then(function (res) {
      console.log('userSignupRequest signup success!', res);
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
      // TODO: dispatch signup successful action to login the new user
      // and redirect him/her to the home page
    }).catch(function (err) {
      console.log('signup error:', err);
      dispatch((0, _flashMessage.addFlashMessage)({
        type: 'error',
        text: 'Signup failed.'
      }));
      dispatch(signupLoading(false));
    });
  };
}

// reducer
function reduceSignupLoading(state, action) {
  return Object.assign({}, state, { signupLoading: action.signupLoading });
}

// root reducer slice
var initialState = {
  signupLoading: false
};
function userSignupRequest() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
  var action = arguments[1];

  switch (action.type) {
    case SIGNUP_LOADING:
      return reduceSignupLoading(state, action);
    default:
      return state;
  }
}