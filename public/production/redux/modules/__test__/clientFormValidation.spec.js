'use strict';

var _clientFormValidation = require('../clientFormValidation');

var _clientFormValidation2 = _interopRequireDefault(_clientFormValidation);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('redux: clientFormValidation', function () {
  it('should return state when no state is given', function () {
    var state = (0, _clientFormValidation2.default)(undefined, {});
    expect(state).toEqual(_clientFormValidation.DEFAULT_STATE);
  });

  describe('dupeUserCheckResults', function () {
    it('should set state.errors and state.invalid', function () {
      var state = (0, _clientFormValidation2.default)(_clientFormValidation.DEFAULT_STATE, (0, _clientFormValidation.dupeUserCheckResults)({}, false));
      expect(state.errors).toEqual({});
      expect(state.invalid).toEqual(false);
    });
    it('should set an state.errors with an error, and state.invalid to true', function () {
      var state = (0, _clientFormValidation2.default)(_clientFormValidation.DEFAULT_STATE, (0, _clientFormValidation.dupeUserCheckResults)({ username: 'username taken' }, true));
      expect(state.errors.username).toEqual('username taken');
      expect(state.invalid).toEqual(true);
    });
  });

  describe('newFormErrors', function () {
    it('should set state.errors with new errors while keeping existing errors', function () {
      var state = (0, _clientFormValidation2.default)(_clientFormValidation.DEFAULT_STATE, (0, _clientFormValidation.newFormErrors)({}, { username: 'username taken' }));
      var state2 = (0, _clientFormValidation2.default)(state, (0, _clientFormValidation.newFormErrors)(state.errors, { email: 'email invalid' }));
      expect(state2.errors).toEqual({ username: 'username taken', email: 'email invalid' });
    });
  });

  describe('checkUserInResponse', function () {
    it('should return username error if username is taken', function () {
      var res = { data: { user: '2Chainz' } };
      var field = 'username';
      var identifier = null;
      var results = (0, _clientFormValidation.checkUserInResponse)(res, field, identifier);
      expect(results.errors.username).toEqual('A user exists with this username');
      expect(results.invalid).toEqual(true);
    });
    it('should return no errors, and invalid as false if username is unique', function () {
      var res = { data: {} };
      var field = 'username';
      var identifier = null;
      var results = (0, _clientFormValidation.checkUserInResponse)(res, field, identifier);
      expect(results.errors.username).toEqual(null);
      expect(results.invalid).toEqual(false);
    });
    it('should return email error if email address is taken', function () {
      var res = { data: { user: '2Chainz' } };
      var field = 'email';
      var identifier = '2Chainz@Truniversity.com';
      var results = (0, _clientFormValidation.checkUserInResponse)(res, field, identifier);
      expect(results.errors.email).toEqual('A user exists with this email');
      expect(results.invalid).toEqual(true);
    });
    it('should return email error if email is invalid', function () {
      var res = { data: {} };
      var field = 'email';
      var identifier = '2Chainz@@';
      var results = (0, _clientFormValidation.checkUserInResponse)(res, field, identifier);
      expect(results.errors.email).toEqual('This email address is invalid');
      expect(results.invalid).toEqual(true);
    });
    it('should return no errors and invalid as false if email is valid', function () {
      var res = { data: {} };
      var field = 'email';
      var identifier = '2Chainz@Truniversity.com';
      var results = (0, _clientFormValidation.checkUserInResponse)(res, field, identifier);
      expect(results.errors).toEqual({ email: null });
      expect(results.invalid).toEqual(false);
    });
  });
}); /* global describe it expect */