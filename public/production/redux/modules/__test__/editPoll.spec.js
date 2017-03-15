'use strict';

var _pollObject = require('../__mock__/pollObject');

var _pollObject2 = _interopRequireDefault(_pollObject);

var _editPoll = require('../editPoll');

var _editPoll2 = _interopRequireDefault(_editPoll);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* global describe it expect */

describe('redux: editPoll', function () {
  it('should return default state when no state is given', function () {
    var state = (0, _editPoll2.default)(undefined, {});
    expect(state).toEqual(_editPoll.DEFAULT_STATE);
  });

  describe('setPollTitle', function () {
    it('should update state.newPollTitle with a string', function () {
      var state = (0, _editPoll2.default)(_editPoll.DEFAULT_STATE, (0, _editPoll.setPollTitle)('test'));
      expect(state.newPollTitle).toEqual('test');
    });
  });

  describe('setPollOptions', function () {
    it('should set state.newPollOptions as an array of at least two option strings', function () {
      var state = (0, _editPoll2.default)(_editPoll.DEFAULT_STATE, (0, _editPoll.setPollOptions)(['one', 'two']));
      expect(state.newPollOptions[0]).toEqual('one');
      expect(state.newPollOptions[1]).toEqual('two');
    });
  });

  describe('setTitleEditable', function () {
    it('should set state.titleEditable to a boolean', function () {
      var state = (0, _editPoll2.default)(_editPoll.DEFAULT_STATE, (0, _editPoll.setTitleEditable)(false));
      expect(state.titleEditable).toEqual(false);
    });
  });

  describe('resetPoll', function () {
    it('should reset everything to default state', function () {
      var state = (0, _editPoll2.default)({
        newPollTitle: 'Trending Poll',
        titleEditable: false,
        newPollOptions: ['Controversial idea', 'Safe idea'],
        editedPoll: null,
        activePollData: null
      }, (0, _editPoll.resetPoll)());
      expect(state).toEqual(_editPoll.DEFAULT_STATE);
    });
  });

  describe('pollEdited', function () {
    it('should set state.editedPoll as an edited poll object', function () {
      var state = (0, _editPoll2.default)(_editPoll.DEFAULT_STATE, (0, _editPoll.pollEdited)(_pollObject2.default));
      expect(state.editedPoll).toEqual(_pollObject2.default);
    });
  });

  describe('activePollData', function () {
    it('should set state.activePollData as the data of the poll being edited', function () {
      var state = (0, _editPoll2.default)(_editPoll.DEFAULT_STATE, (0, _editPoll.activePollData)(_pollObject2.default));
      expect(state.activePollData).toEqual(_pollObject2.default);
    });
  });
});