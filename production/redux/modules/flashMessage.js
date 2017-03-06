'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.reduceDeleteFlashMessage = exports.reduceAddFlashMessage = exports.DELETE_FLASH_MESSAGE = exports.ADD_FLASH_MESSAGE = undefined;
exports.addFlashMessage = addFlashMessage;
exports.deleteFlashMessage = deleteFlashMessage;
exports.clearAllFlashMessages = clearAllFlashMessages;
exports.default = flashMessages;

var _shortid = require('shortid');

var _shortid2 = _interopRequireDefault(_shortid);

var _findIndex = require('lodash/findIndex');

var _findIndex2 = _interopRequireDefault(_findIndex);

var _map = require('lodash/map');

var _map2 = _interopRequireDefault(_map);

var _clone = require('lodash/clone');

var _clone2 = _interopRequireDefault(_clone);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

// Actions
var ADD_FLASH_MESSAGE = exports.ADD_FLASH_MESSAGE = 'ADD_FLASH_MESSAGE';
var DELETE_FLASH_MESSAGE = exports.DELETE_FLASH_MESSAGE = 'DELETE_FLASH_MESSAGE';
var CLEAR_ALL_FLASH_MESSAGES = 'CLEAR_ALL_FLASH_MESSAGES';

// Action Creators
function addFlashMessage(message) {
  return { type: ADD_FLASH_MESSAGE, value: message };
}
function deleteFlashMessage(id) {
  return { type: DELETE_FLASH_MESSAGE, value: id };
}
function clearAllFlashMessages() {
  return { type: CLEAR_ALL_FLASH_MESSAGES };
}

// Reducers
var reduceAddFlashMessage = exports.reduceAddFlashMessage = function reduceAddFlashMessage(state, action) {
  var newState = {};

  Object.assign(newState, state, {
    flashMessages: [].concat(_toConsumableArray(state.flashMessages), [{
      id: _shortid2.default.generate(),
      messageType: action.value.type,
      messageText: action.value.text
    }])
  });
  return newState;
};
var reduceDeleteFlashMessage = exports.reduceDeleteFlashMessage = function reduceDeleteFlashMessage(state, action) {
  var newState = {};

  var index = (0, _findIndex2.default)(state.flashMessages, { id: action.value });

  if (index >= 0) {
    // makes a clone of state.flashMessages to be mutated
    var newFlashMessages = (0, _map2.default)(state.flashMessages, _clone2.default);

    newFlashMessages.splice(index, 1);
    Object.assign(newState, state, {
      flashMessages: newFlashMessages
    });
    return newState;
  }

  return state;
};
var reduceClearAllFlashMessages = function reduceClearAllFlashMessages(state, action) {
  return Object.assign({}, state, { flashMessages: [] });
};

var initialState = {
  flashMessages: []
};

// Root Reducer Slice
function flashMessages() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
  var action = arguments[1];

  switch (action.type) {
    case ADD_FLASH_MESSAGE:
      return reduceAddFlashMessage(state, action);
    case DELETE_FLASH_MESSAGE:
      return reduceDeleteFlashMessage(state, action);
    case CLEAR_ALL_FLASH_MESSAGES:
      return reduceClearAllFlashMessages(state, action);
    default:
      return state;
  }
}