'use strict';

var _pollObject = require('../__mock__/pollObject');

var _pollObject2 = _interopRequireDefault(_pollObject);

var _getAllPolls = require('../getAllPolls');

var _getAllPolls2 = _interopRequireDefault(_getAllPolls);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* global describe it expect */

describe('redux: getAllPolls', function () {
  it('should return default state if no state is given', function () {
    var state = (0, _getAllPolls2.default)(undefined, {});
    expect(state).toEqual(_getAllPolls.DEFAULT_STATE);
  });

  describe('pollsData', function () {
    it('should set state.allPolls as an array of poll objects', function () {
      var state = (0, _getAllPolls2.default)(_getAllPolls.DEFAULT_STATE, (0, _getAllPolls.pollsData)([_pollObject2.default, _pollObject2.default]));
      expect(state).toEqual({ allPolls: [_pollObject2.default, _pollObject2.default] });
    });
  });
});