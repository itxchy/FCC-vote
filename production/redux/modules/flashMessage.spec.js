'use strict';

var _flashMessage = require('./flashMessage');

var _flashMessage2 = _interopRequireDefault(_flashMessage);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('redux: flashMessage', function () {
  it('should return default state if no state is given', function () {
    var state = (0, _flashMessage2.default)(undefined, {});
    expect(state).toEqual(_flashMessage.DEFAULT_STATE);
  });

  describe('addFlashMessage', function () {
    it('should update state.flashMessages with a new flashMessage object', function () {
      var state = (0, _flashMessage2.default)(_flashMessage.DEFAULT_STATE, (0, _flashMessage.addFlashMessage)({ type: 'success', text: 'testing' }));
      expect(state.flashMessages[0].messageType).toEqual('success');
      expect(state.flashMessages[0].messageText).toEqual('testing');
    });
    it('should add a new flash message while keeping existing flash messages', function () {
      var state = (0, _flashMessage2.default)(_flashMessage.DEFAULT_STATE, (0, _flashMessage.addFlashMessage)({ type: 'success', text: 'testing' }));
      var state2 = (0, _flashMessage2.default)(state, (0, _flashMessage.addFlashMessage)({ type: 'error', text: 'testing42' }));
      expect(state2.flashMessages[0].messageType).toEqual('success');
      expect(state2.flashMessages[0].messageText).toEqual('testing');
      expect(state2.flashMessages[1].messageType).toEqual('error');
      expect(state2.flashMessages[1].messageText).toEqual('testing42');
      expect(state2.flashMessages[0].id).not.toEqual(state2.flashMessages[1].id);
    });
  });

  describe('deleteFlashMessage', function () {
    it('should delete a flash message based on its id', function () {
      var state = (0, _flashMessage2.default)({ flashMessages: [{ id: '123', messageType: 'success', messageText: 'keep' }, { id: '456', messageType: 'error', messageText: 'be gone' }]
      }, (0, _flashMessage.deleteFlashMessage)('456'));
      expect(state.flashMessages.length).toEqual(1);
      expect(state.flashMessages[0].id).toEqual('123');
    });
  });

  describe('clearAllFlashMessages', function () {
    it('should reset state.flashMessages to its default state of null', function () {
      var state = (0, _flashMessage2.default)({ flashMessages: [{ id: '123', messageType: 'success', messageText: 'keep' }, { id: '456', messageType: 'error', messageText: 'be gone' }]
      }, (0, _flashMessage.clearAllFlashMessages)());
      expect(state).toEqual(_flashMessage.DEFAULT_STATE);
    });
  });
});