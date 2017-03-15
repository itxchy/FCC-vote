'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DEFAULT_STATE = undefined;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; /* global localStorage */

exports.login = login;
exports.logout = logout;
exports.getClientIp = getClientIp;
exports.setCurrentUser = setCurrentUser;
exports.userLoading = userLoading;
exports.setErrors = setErrors;
exports.setClientIp = setClientIp;
exports.default = user;
exports.handleLoginResponse = handleLoginResponse;
exports.prepareUserFromToken = prepareUserFromToken;

var _axios = require('axios');

var _axios2 = _interopRequireDefault(_axios);

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var _setAuthorizationToken = require('../../auth/setAuthorizationToken');

var _setAuthorizationToken2 = _interopRequireDefault(_setAuthorizationToken);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// ******* Action Types *******

var SET_CURRENT_USER = 'SET_CURRENT_USER';
var USER_LOADING = 'USER_LOADING';
var SET_CLIENT_IP = 'SET_CLIENT_IP';
var SET_ERRORS = 'SET_ERRORS';

// ******* Action Creators & Reducers *******

/**
 * Attempts to authenticate a user on the server.
 *
 * @param {object} data - An object containing an identifier and password to login with.
 * example: { identifier: 'TracyJordan', password: 'IAMMYOWNPASSWORD'}
 *
 * The response from /api/auth will be:
 * res.data.errors - errors object: { errors: { form: 'Invalid Credentials' } }
 * or
 * res.data.token - token object: { id: '12341234asdfasdf', username: 'PollKilla', iat: '1324567894'}
 */
function login(data) {
  return function (dispatch) {
    dispatch(userLoading(true));
    _axios2.default.post('/api/auth', data).then(function (res) {
      return handleLoginResponse(res, dispatch, prepareUserFromToken);
    }).catch(function (err) {
      dispatch(userLoading(false));
      console.error('ERROR: redux: login request returned a server error:', err);
      return dispatch(setErrors({ server: 'Server error. Try agian in a moment.' }));
    });
  };
}
/**
 * Removes a user's jwt from localstorage and client headers, and clears user state in redux
 */
function logout() {
  return function (dispatch) {
    localStorage.removeItem('jwtToken');
    (0, _setAuthorizationToken2.default)(false);
    dispatch(setCurrentUser({}));
  };
}
/**
 * Retrieves the client's IP address from the server
 */
function getClientIp() {
  return function (dispatch) {
    _axios2.default.get('/api/auth/ip').then(function (res) {
      dispatch(setClientIp(res.data.clientIp));
    }).catch(function (err) {
      console.error('ERROR: redux: failed to receive current client ip address from the server', err);
    });
  };
}

/**
 * Sets state.user, and eventually state.isAuthenticated and state.userLoading
 * in its reducer.
 *
 * @param {object} user - A decoded jwt, or an error object
 *
 * The token object being set to user will contain a newly authenticated
 * user's id string and username string, as well as the token's timestamp as iat.
 * example: { id: '12341234asdfasdf', username: 'PollKilla', iat: '1324567894'}
 */
function setCurrentUser() {
  var user = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  return {
    type: SET_CURRENT_USER,
    user: user
  };
}
/**
 * Sets the user object as action.user if defined and valid, of null
 * if the user object is empty or invalid. state.isAuthenticated defaults to false,
 * but gets set to true if the user object is valid. state.userLoading gets set to false
 * regardless.
 */
var setCurrentUserReducer = function setCurrentUserReducer(state, action) {
  var authenticationStatus = false;
  var user = action.user;
  if (user && user.username) {
    authenticationStatus = true;
  } else {
    user = null;
  }
  return Object.assign({}, state, {
    isAuthenticated: authenticationStatus,
    user: user,
    userLoading: false
  });
};

/**
 * Sets state.userLoading
 *
 * @param {boolean} bool
 */
function userLoading(bool) {
  return {
    type: USER_LOADING,
    userLoading: bool
  };
}
var userLoadingReducer = function userLoadingReducer(state, action) {
  if (typeof action.userLoading !== 'boolean') {
    console.error('ERROR: redux: userLoading was not passed a boolean:', action.userLoading);
    return Object.assign({}, state, { userLoading: false });
  }
  return Object.assign({}, state, { userLoading: action.userLoading });
};

/**
 * Sets state.errors
 *
 * @param {object} errors - should contain a form error or server error
 * example: { form: 'Invalid Credentials' } or { server: 'Server error. Try again in a moment.' }
 */
function setErrors() {
  var errors = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  return {
    type: SET_ERRORS,
    errors: errors,
    userLoading: false
  };
}
var setErrorsReducer = function setErrorsReducer(state, action) {
  if (_typeof(action.errors) !== 'object') {
    return Object.assign({}, state);
  }
  if (!action.errors.form && !action.errors.server) {
    console.error('ERROR: redux: Unknown error key passed in error object to setErrors:', action.errors);
  }
  return Object.assign({}, state, { errors: action.errors });
};

/**
 * Sets state.clientIp
 *
 * @param {string} clientIp - The client's IP address as a string received from the server.
 */
function setClientIp(clientIp) {
  return {
    type: SET_CLIENT_IP,
    clientIp: clientIp
  };
}
var setClientIpReducer = function setClientIpReducer(state, action) {
  return Object.assign({}, state, { clientIp: action.clientIp });
};

// ******* Root Reducer Slice *******

var DEFAULT_STATE = exports.DEFAULT_STATE = {
  isAuthenticated: null,
  user: null,
  errors: null,
  userLoading: false,
  clientIp: null
};
function user() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : DEFAULT_STATE;
  var action = arguments[1];

  switch (action.type) {
    case SET_CURRENT_USER:
      return setCurrentUserReducer(state, action);
    case USER_LOADING:
      return userLoadingReducer(state, action);
    case SET_CLIENT_IP:
      return setClientIpReducer(state, action);
    case SET_ERRORS:
      return setErrorsReducer(state, action);
    default:
      return state;
  }
}

// ************** Lib **************

/**
 * After a login attempt to '/api/auth' with the client's credentials,
 * the response from the server gets handled here. If the login attempt is
 * successful, a token will be in the response as res.data.token. If the user's
 * username/email and password not correct, an error object will be in the
 * response as res.data.errors.form. If no token or errors object come with the
 * response, something went wrong on the server, and a server error will be passed
 * along
 *
 * @param {object} res - Either res.data.errors or res.data.token should be defined
 * @param {function} dispatch - Redux's dispatch function in this function's calling context
 * @param {function} prepareUser - Alias for prepareUserFromToken. The name change is to
 * fix a name collision in testing.
 */
function handleLoginResponse(res, dispatch, prepareUser) {
  console.log('auth.js: res.data:', res.data);
  if (!res.data) {
    dispatch(userLoading(false));
    console.error('res.data not present from \'/api/auth\' :', res);
    return dispatch(setErrors({ server: 'Server Error. Bad response.' }));
  }
  // handle unsuccessful login
  if (res.data.errors) {
    // res.data will contain { errors: { form: 'Invalid Credentials' } }
    return dispatch(setErrors(res.data.errors));
  }
  // handle token on successful login
  var user = prepareUser(res);
  if (user && user.username) {
    dispatch(setCurrentUser(user));
    return dispatch(userLoading(false));
  }
  // if the server responds but res.data.errors and res.data.token are not defined, handle it here.
  // This should never get reached.
  dispatch(userLoading(false));
  console.error('ERROR: redux: no errors or token offered from \'/api/auth\' :', res);
  return dispatch(setErrors({ server: 'no errors or token returned' }));
}

/**
 * Prepares the user object by decoding a valid JSON web token. This also
 * sets the token in localStorage and the client's headers through setAuthorizationToken.
 * These side effects hindered this function's testability to the point where
 * mocking localStorage, jwt, and setAuthorizationToken would require tight coupling with handleLoginResponse and
 * up to the login action creator, so I opted out of testing this function to keep the flow clear and simple.
 * This function isn't doing much.
 *
 * @param {object} res - The response object from Express. res.data.token should
 * be defined at this point, otherwise its an error.
 *
 * @returns {object} user - Decoded token such as: { id: '12341234asdfasdf', username: 'PollKilla', iat: '1324567894'}
 * @returns {null} null - If a token isn't found in the response object, something went wrong.
 */
function prepareUserFromToken(res) {
  console.log('prepareUserFromToken res:', res);
  var token = res.data.token ? res.data.token : null;
  if (token) {
    localStorage.setItem('jwtToken', token);
    (0, _setAuthorizationToken2.default)(token);
    var _user = _jsonwebtoken2.default.decode(token);
    return _user;
  } else {
    console.error('ERROR: redux: prepareUserFromToken did not receive a token', res);
    return null;
  }
}