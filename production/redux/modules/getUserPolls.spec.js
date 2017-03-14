'use strict';

var _getUserPolls = require('./getUserPolls');

var _getUserPolls2 = _interopRequireDefault(_getUserPolls);

var _pollObject = require('./__mock__/pollObject');

var _pollObject2 = _interopRequireDefault(_pollObject);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('redux: getUserPolls', function () {
  it('should return default state if no state is passed as a parameter', function () {
    var state = (0, _getUserPolls2.default)(undefined, {});
    expect(state).toEqual(_getUserPolls.DEFAULT_STATE);
  });

  describe('setUserPollsData', function () {
    it('should set state.userPolls with an array of poll objects', function () {
      var state = (0, _getUserPolls2.default)(_getUserPolls.DEFAULT_STATE, (0, _getUserPolls.setUserPollsData)([_pollObject2.default, _pollObject2.default]));
      expect(state).toEqual({ userPolls: [_pollObject2.default, _pollObject2.default] });
    });
  });

  describe('clearUserPolls', function () {
    it('should reset state.userPolls to default state of null', function () {
      var state = (0, _getUserPolls2.default)({ userPolls: [_pollObject2.default, _pollObject2.default] }, (0, _getUserPolls.clearUserPolls)());
      expect(state).toEqual(_getUserPolls.DEFAULT_STATE);
    });
  });
});