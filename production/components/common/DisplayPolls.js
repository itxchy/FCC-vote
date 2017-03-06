'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _ResultsCard = require('./ResultsCard');

var _ResultsCard2 = _interopRequireDefault(_ResultsCard);

var _PollCard = require('./PollCard');

var _PollCard2 = _interopRequireDefault(_PollCard);

var _EmptyPolls = require('./EmptyPolls');

var _EmptyPolls2 = _interopRequireDefault(_EmptyPolls);

var _pollsLib = require('../../routes/lib/pollsLib');

var _isEmpty = require('lodash/isEmpty');

var _isEmpty2 = _interopRequireDefault(_isEmpty);

var _has = require('lodash/has');

var _has2 = _interopRequireDefault(_has);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _React$PropTypes = _react2.default.PropTypes,
    func = _React$PropTypes.func,
    array = _React$PropTypes.array,
    object = _React$PropTypes.object,
    bool = _React$PropTypes.bool,
    string = _React$PropTypes.string;


var DisplayPolls = _react2.default.createClass({
  displayName: 'DisplayPolls',

  propTypes: {
    polls: array,
    user: object,
    clientIp: string,
    isAuthenticated: bool,
    dispatchSubmitVote: func,
    getPolls: func,
    myPolls: bool
  },
  populateCards: function populateCards() {
    var _this = this;

    var singlePoll = this.props.polls.length === 1;
    return this.props.polls.map(function (poll) {
      var currentUser = _this.props.isAuthenticated && _this.props.user ? _this.props.user.username : _this.props.clientIp;
      var dupeVoter = (0, _pollsLib.dupeVoterCheck)(poll, currentUser);
      var title = poll.title,
          options = poll.options,
          totalVotes = poll.totalVotes,
          _id = poll._id,
          owner = poll.owner;

      if (dupeVoter || _this.props.myPolls) {
        return _react2.default.createElement(_ResultsCard2.default, {
          singlePoll: singlePoll,
          user: _this.props.user,
          key: _id,
          title: title,
          options: options,
          totalVotes: totalVotes,
          id: _id,
          owner: owner
        });
      }
      return _react2.default.createElement(_PollCard2.default, {
        singlePoll: singlePoll,
        dispatchSubmitVote: _this.props.dispatchSubmitVote,
        user: _this.props.user,
        key: _id,
        title: title,
        options: options,
        totalVotes: totalVotes,
        id: _id,
        owner: owner
      });
    });
  },
  componentWillMount: function componentWillMount() {
    this.props.getPolls();
  },
  render: function render() {
    // if the polls haven't loaded yet, show a loading dialog
    if (!this.props.polls || (0, _isEmpty2.default)(this.props.polls || this.props.isAuthenticated === null)) {
      return _react2.default.createElement(_EmptyPolls2.default, { polls: this.props.polls });
    }
    // if no polls are returned, tell the user they have no polls
    if ((0, _has2.default)(this.props.polls[0], 'polls') && this.props.polls[0].polls === null) {
      return _react2.default.createElement(_EmptyPolls2.default, { polls: false });
    }
    var populatedCards = this.populateCards();
    return _react2.default.createElement(
      'div',
      { className: 'container' },
      populatedCards
    );
  }
});

exports.default = DisplayPolls;