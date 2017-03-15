'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DEFAULT_STATE = undefined;
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

var DEFAULT_STATE = exports.DEFAULT_STATE = {
  flashMessages: []
};

// ******* Action Types *******

var ADD_FLASH_MESSAGE = 'ADD_FLASH_MESSAGE';
var DELETE_FLASH_MESSAGE = 'DELETE_FLASH_MESSAGE';
var CLEAR_ALL_FLASH_MESSAGES = 'CLEAR_ALL_FLASH_MESSAGES';

// ******* Action Creators & Reducers *******

/**
 * Adds a new flash message object to the state.flashMessages array.
 * The message object will contain a 'type' key with a string value, either 'success' or 'error'.
 * It will also contain a 'text' key with a string value, which is a user-facing message.
 * example: { type: 'success', text: 'New poll created!' }
 *
 * @param {object} message - A flash message object
 */
function addFlashMessage(message) {
  return { type: ADD_FLASH_MESSAGE, value: message };
}
var addFlashMessageReducer = function addFlashMessageReducer(state, action) {
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

/**
 * Deletes a flash message from state.flashmessage's array based on the
 * message object's id value.
 *
 * @param {string} id - The id of a flash message to delete
 */
function deleteFlashMessage(id) {
  return { type: DELETE_FLASH_MESSAGE, value: id };
}
var deleteFlashMessageReducer = function deleteFlashMessageReducer(state, action) {
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

/**
 * Restores state.flashMessages to an empty array
 */
function clearAllFlashMessages() {
  return { type: CLEAR_ALL_FLASH_MESSAGES };
}
var clearAllFlashMessagesReducer = function clearAllFlashMessagesReducer(state, action) {
  return Object.assign({}, state, DEFAULT_STATE);
};

// ******* Root Reducer Slice *******

function flashMessages() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : DEFAULT_STATE;
  var action = arguments[1];

  switch (action.type) {
    case ADD_FLASH_MESSAGE:
      return addFlashMessageReducer(state, action);
    case DELETE_FLASH_MESSAGE:
      return deleteFlashMessageReducer(state, action);
    case CLEAR_ALL_FLASH_MESSAGES:
      return clearAllFlashMessagesReducer(state, action);
    default:
      return state;
  }
}