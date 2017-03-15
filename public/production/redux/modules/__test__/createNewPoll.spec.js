'use strict';

var _createNewPoll = require('../createNewPoll');

var _createNewPoll2 = _interopRequireDefault(_createNewPoll);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('redux: newPoll', function () {
  it('if the state parameter passed to the newPoll root reducer slice is falsy, DEFAULT_STATE should be returned', function () {
    var state = (0, _createNewPoll2.default)(undefined, {});
    expect(state).toEqual(_createNewPoll.DEFAULT_STATE);
  });

  describe('setNewPollTitle', function () {
    it('should set state.newPollTitle as a string passed to setNewPollTitle', function () {
      var state = (0, _createNewPoll2.default)(null, (0, _createNewPoll.setNewPollTitle)('Controversial Title'));
      expect(state.newPollTitle).toBe('Controversial Title');
    });
    it('should return previous state if setNewPollTitle\'s argument is not a string', function () {
      var state = Object.assign({}, _createNewPoll.DEFAULT_STATE, { newPollTitle: 'Test Title' });
      var newState = (0, _createNewPoll2.default)(state, (0, _createNewPoll.setNewPollTitle)(null));
      expect(newState.newPollTitle).toBe('Test Title');
    });
  });

  describe('setTitleEditable', function () {
    it('should set state.titleEditable as the boolean passed to setTitleEditable', function () {
      var state = (0, _createNewPoll2.default)(null, (0, _createNewPoll.setTitleEditable)(false));
      expect(state.titleEditable).toBe(false);
    });
    it('should set or keep state.titleEditable as true if a boolean is not passed to setTitleEditable', function () {
      var state = (0, _createNewPoll2.default)(null, (0, _createNewPoll.setTitleEditable)('I am not a boolean!'));
      expect(state.titleEditable).toBe(true);
    });
  });

  describe('updateOption', function () {
    it('should set state.newPollOptions as the array of option strings passed to it', function () {
      var state = (0, _createNewPoll2.default)(null, (0, _createNewPoll.updateOption)(['thing 1', 'thing 2']));
      expect(state.newPollOptions).toEqual(expect.arrayContaining(['thing 1', 'thing 2']));
    });
    it('should return previous state if less than two option strings are given', function () {
      var state = Object.assign({}, _createNewPoll.DEFAULT_STATE, { newPollOptions: ['thing 1', 'thing 2'] });
      var newState = (0, _createNewPoll2.default)(state, (0, _createNewPoll.updateOption)(['thing 3']));
      expect(newState.newPollOptions).toEqual(expect.arrayContaining(['thing 1', 'thing 2']));
    });
  });

  describe('resetNewPoll', function () {
    it('should return the createNewPoll module to its default state', function () {
      var state = Object.assign({}, _createNewPoll.DEFAULT_STATE, { newPollTitle: 'Things' });
      expect(state.newPollTitle).toBe('Things');
      var newState = (0, _createNewPoll2.default)(state, (0, _createNewPoll.resetNewPoll)());
      expect(newState).toEqual(_createNewPoll.DEFAULT_STATE);
    });
  });

  describe('pollSaved', function () {
    it('should set state.pollSaved as a string of a new poll\'s id', function () {
      var state = (0, _createNewPoll2.default)(null, (0, _createNewPoll.pollSaved)('asdfASDF'));
      expect(state.pollSaved).toBe('asdfASDF');
    });
    it('should set state.pollSaved as false if a string is not passed to pollSaved', function () {
      var state = (0, _createNewPoll2.default)(null, (0, _createNewPoll.pollSaved)(undefined));
      expect(state.pollSaved).toBe(false);
    });
  });

  describe('resetPollSaved', function () {
    it('should set state.pollSaved as null', function () {
      var state = Object.assign({}, _createNewPoll.DEFAULT_STATE, { pollSaved: 'CRAZYID4242' });
      expect(state.pollSaved).toBe('CRAZYID4242');
      var newState = (0, _createNewPoll2.default)(state, (0, _createNewPoll.resetPollSaved)());
      expect(newState.pollSaved).toBe(null);
    });
  });
}); /* global describe it expect */