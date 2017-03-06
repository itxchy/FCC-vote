'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _redux = require('redux');

var _flashMessage = require('./modules/flashMessage');

var _flashMessage2 = _interopRequireDefault(_flashMessage);

var _createNewPoll = require('./modules/createNewPoll');

var _createNewPoll2 = _interopRequireDefault(_createNewPoll);

var _auth = require('./modules/auth');

var _auth2 = _interopRequireDefault(_auth);

var _getAllPolls = require('./modules/getAllPolls');

var _getAllPolls2 = _interopRequireDefault(_getAllPolls);

var _submitVote = require('./modules/submitVote');

var _submitVote2 = _interopRequireDefault(_submitVote);

var _clientFormValidation = require('./modules/clientFormValidation');

var _clientFormValidation2 = _interopRequireDefault(_clientFormValidation);

var _userSignupRequest = require('./modules/userSignupRequest');

var _userSignupRequest2 = _interopRequireDefault(_userSignupRequest);

var _getUserPolls = require('./modules/getUserPolls');

var _getUserPolls2 = _interopRequireDefault(_getUserPolls);

var _getSinglePoll = require('./modules/getSinglePoll');

var _getSinglePoll2 = _interopRequireDefault(_getSinglePoll);

var _editPoll = require('./modules/editPoll');

var _editPoll2 = _interopRequireDefault(_editPoll);

var _deletePoll = require('./modules/deletePoll');

var _deletePoll2 = _interopRequireDefault(_deletePoll);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = (0, _redux.combineReducers)({
  flashMessages: _flashMessage2.default,
  newPoll: _createNewPoll2.default,
  user: _auth2.default,
  allPolls: _getAllPolls2.default,
  newVote: _submitVote2.default,
  clientFormValidation: _clientFormValidation2.default,
  userSignupRequest: _userSignupRequest2.default,
  userPolls: _getUserPolls2.default,
  singlePoll: _getSinglePoll2.default,
  editPoll: _editPoll2.default,
  deletedPoll: _deletePoll2.default
});