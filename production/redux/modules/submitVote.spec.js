'use strict';

var _submitVote = require('./submitVote');

var _submitVote2 = _interopRequireDefault(_submitVote);

var _pollObject = require('./__mock__/pollObject');

var _pollObject2 = _interopRequireDefault(_pollObject);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('redux: newVote', function () {
  it('should return default state', function () {
    var state = (0, _submitVote2.default)(undefined, {});
    expect(state).toEqual(_submitVote.DEFAULT_STATE);
  });

  describe('updatedPollResults', function () {
    it('should set state.updatedResults as an updated poll results object', function () {
      var state = (0, _submitVote2.default)(_submitVote.DEFAULT_STATE, (0, _submitVote.updatedPollResults)(_pollObject2.default));
      expect(state.updatedResults).toEqual(_pollObject2.default);
    });
  });

  describe('resetUpdatedPollResults', function () {
    it('should reset state.updatedResults to default state', function () {
      var state = (0, _submitVote2.default)({ updatedResults: _pollObject2.default }, (0, _submitVote.resetUpdatedPollResults)());
      expect(state).toEqual(_submitVote.DEFAULT_STATE);
    });
  });
});