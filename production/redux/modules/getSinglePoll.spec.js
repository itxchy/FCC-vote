'use strict';

var _getSinglePoll = require('./getSinglePoll');

var _getSinglePoll2 = _interopRequireDefault(_getSinglePoll);

var _pollObject = require('./__mock__/pollObject');

var _pollObject2 = _interopRequireDefault(_pollObject);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('redux: getSinglePoll', function () {
  it('should return default state when no state is given', function () {
    var state = (0, _getSinglePoll2.default)(undefined, {});
    expect(state).toEqual(_getSinglePoll.DEFAULT_STATE);
  });

  describe('setSinglePollData', function () {
    it('should set state.singlePoll as an array with a single poll object', function () {
      var state = (0, _getSinglePoll2.default)(_getSinglePoll.DEFAULT_STATE, (0, _getSinglePoll.setSinglePollData)([_pollObject2.default]));
      expect(state).toEqual({ singlePoll: [_pollObject2.default] });
    });
  });

  describe('clearSinglePoll', function () {
    it('should reset state.singlePoll to default state', function () {
      var state = (0, _getSinglePoll2.default)({ singlePoll: [_pollObject2.default] }, (0, _getSinglePoll.clearSinglePoll)());
      expect(state).toEqual(_getSinglePoll.DEFAULT_STATE);
    });
  });
});