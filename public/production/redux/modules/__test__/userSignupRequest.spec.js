'use strict';

var _userSignupRequest = require('../userSignupRequest');

var _userSignupRequest2 = _interopRequireDefault(_userSignupRequest);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('redux: userSignupRequest', function () {
  it('should return default state when no state is passed in', function () {
    var state = (0, _userSignupRequest2.default)(undefined, {});
    expect(state).toEqual(_userSignupRequest.DEFAULT_STATE);
  });

  describe('signupLoading', function () {
    it('should set state.signupLoading to a bool that is given as a parameter', function () {
      var state = (0, _userSignupRequest2.default)(_userSignupRequest.DEFAULT_STATE, (0, _userSignupRequest.signupLoading)(true));
      expect(state.signupLoading).toEqual(true);
    });
  });
}); /* global describe it expect */