'use strict';

var _deletePoll = require('../deletePoll');

var _deletePoll2 = _interopRequireDefault(_deletePoll);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('redux: deletePoll', function () {
  it('should be initialized with default state if no state object is given', function () {
    var state = (0, _deletePoll2.default)(undefined, {});
    expect(state).toEqual(_deletePoll.DEFAULT_STATE);
  });

  describe('pollDeleted', function () {
    it('should set state.deletedPoll as the deleted poll\'s id', function () {
      var state = (0, _deletePoll2.default)(_deletePoll.DEFAULT_STATE, (0, _deletePoll.pollDeleted)('123abc'));
      expect(state).toEqual({ deletedPoll: '123abc' });
    });
  });

  describe('resetDeletedPoll', function () {
    it('should set state.deletedPoll to default state', function () {
      var state = (0, _deletePoll2.default)({ deletedPoll: '123abc' }, (0, _deletePoll.resetDeletedPoll)());
      expect(state).toEqual(_deletePoll.DEFAULT_STATE);
    });
  });
}); /* global describe it expect */