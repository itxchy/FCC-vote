'use strict';

var _auth = require('./auth');

var _auth2 = _interopRequireDefault(_auth);

var _auth3 = require('./auth.js');

var _reduxMockStore = require('redux-mock-store');

var _reduxMockStore2 = _interopRequireDefault(_reduxMockStore);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var middlewares = [];
var mockStore = (0, _reduxMockStore2.default)(middlewares);

describe('redux: user', function () {
  it('if the state parameter passed to the user root reducer slice is falsy, DEFAULT_STATE should be returned', function () {
    var state = (0, _auth2.default)(undefined, {});
    console.log('test state Default:', state);
    expect(state).toEqual(_auth3.DEFAULT_STATE);
  });

  describe('setCurrentUser', function () {
    var mockUser = { id: '12341234asdfasdf', username: 'PollKilla', iat: '1324567894' };
    var stateWithValidUser = (0, _auth2.default)(_auth3.DEFAULT_STATE, (0, _auth3.setCurrentUser)(mockUser));
    it('should set state.user as the user object passed to setCurrentUser', function () {
      expect(stateWithValidUser.user).toBe(mockUser);
    });
    it('should set state.isAuthenticated to true if user object is valid', function () {
      expect(stateWithValidUser.isAuthenticated).toBe(true);
    });
    it('should set state.userLoading to false whether user object is valid or not', function () {
      expect(stateWithValidUser.userLoading).toBe(false);
    });
    it('should set state.isAuthenticated to false if user object is invalid', function () {
      var stateWithInvalidUser = (0, _auth2.default)(_auth3.DEFAULT_STATE, (0, _auth3.setCurrentUser)({ error: 'bad news' }));
      expect(stateWithInvalidUser.isAuthenticated).toBe(false);
    });
  });

  describe('userLoading', function () {
    it('should set state.userLoading as the boolean passed to userLoading', function () {
      var state = (0, _auth2.default)(_auth3.DEFAULT_STATE, (0, _auth3.userLoading)(true));
      expect(state.userLoading).toBe(true);
    });
    it('should keep state.userLoading as false if the parameter passed is not a boolean', function () {
      var state = (0, _auth2.default)(_auth3.DEFAULT_STATE, (0, _auth3.userLoading)('wat'));
      expect(state.userLoading).toBe(false);
    });
  });

  describe('setErrors', function () {
    it('should set state.errors as the object passed to setErrors', function () {
      var state = (0, _auth2.default)(_auth3.DEFAULT_STATE, (0, _auth3.setErrors)({ form: 'Invalid Credentials' }));
      expect(state.errors.form).toBe('Invalid Credentials');
    });
    it('should simply pass the new unchanged state along if setErrors\'s parameter is not an object', function () {
      var state = (0, _auth2.default)(_auth3.DEFAULT_STATE, (0, _auth3.setErrors)(42));
      expect(state.errors).toBe(null);
    });
    // it('should call console.error if an unknown error key is passed with the error object, but still set the unknown error', () => {
    //   global.console = { error: jest.fn() }
    //   let state = userReducerSlice(DEFAULT_STATE, setErrors({ wat: 'is this really an error?' }))
    //   expect(console.error).toBeCalled()
    //   expect(state.errors.wat).toBe('is this really an error?')
    // })
  });

  describe('setClientIp', function () {
    it('should set state.clientIp as the string passed to setClientIp', function () {
      var state = (0, _auth2.default)(_auth3.DEFAULT_STATE, (0, _auth3.setClientIp)('100.000.000.000'));
      expect(state.clientIp).toBe('100.000.000.000');
    });
  });

  describe('handleLoginResponse', function () {
    var prepareUserFromToken = jest.fn().mockReturnValue({ id: '12341234asdfasdf', username: 'PollKilla', iat: '1324567894' });
    it('should set form errors with setErrors if res.data.errors is present', function () {
      var initialState = {};
      var store = mockStore(initialState);
      (0, _auth3.handleLoginResponse)({ data: { errors: 'err0r' } }, store.dispatch, prepareUserFromToken);
      var actions = store.getActions();

      expect(actions[0].type).toEqual('SET_ERRORS');
      expect(actions[0].errors).toEqual('err0r');
    });
    it('should dispatch setCurrentUser with user object and userLoading(false) if proper token is received', function () {
      var prepareUserFromToken = jest.fn(function () {
        return { id: '12341234asdfasdf', username: 'PollKilla', iat: '1324567894' };
      });
      var initialState = {};
      var store = mockStore(initialState);
      (0, _auth3.handleLoginResponse)({ data: { token: true } }, store.dispatch, prepareUserFromToken);
      var actions = store.getActions();

      expect(actions[0].type).toEqual('SET_CURRENT_USER');
      expect(actions[0].user).toEqual({ id: '12341234asdfasdf', username: 'PollKilla', iat: '1324567894' });
      expect(actions[1].type).toEqual('USER_LOADING');
      expect(actions[1].userLoading).toEqual(false);
    });
    it('should dispatch setErrors with a server error if res.data is not defined', function () {
      var initialState = {};
      var store = mockStore(initialState);
      (0, _auth3.handleLoginResponse)({}, store.dispatch, prepareUserFromToken);
      var actions = store.getActions();

      expect(actions[0].type).toEqual('USER_LOADING');
      expect(actions[0].userLoading).toEqual(false);
      expect(actions[1].type).toEqual('SET_ERRORS');
      expect(actions[1].errors).toEqual({ 'server': 'Server Error. Bad response.' });
    });
  });
});