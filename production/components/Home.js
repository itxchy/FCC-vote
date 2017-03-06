'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRedux = require('react-redux');

var _DisplayPolls = require('./common/DisplayPolls');

var _DisplayPolls2 = _interopRequireDefault(_DisplayPolls);

var _getAllPolls = require('../redux/modules/getAllPolls');

var _submitVote = require('../redux/modules/submitVote');

var _deletePoll = require('../redux/modules/deletePoll');

var _flashMessage = require('../redux/modules/flashMessage');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _React$PropTypes = _react2.default.PropTypes,
    func = _React$PropTypes.func,
    object = _React$PropTypes.object,
    array = _React$PropTypes.array,
    string = _React$PropTypes.string,
    bool = _React$PropTypes.bool;


var Home = _react2.default.createClass({
  displayName: 'Home',

  propTypes: {
    dispatchGetAllPolls: func,
    dispatchSubmitVote: func,
    dispatchResetUpdatedPollResults: func,
    dispatchResetDeletedPoll: func,
    dispatchClearAllFlashMessages: func,
    deletedPoll: string,
    user: object,
    logoutRedirect: bool,
    isAuthenticated: bool,
    clientIp: string,
    allPolls: array,
    flashMessages: array,
    updatedPollResults: object
  },
  componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
    // after a vote is submitted, show the results
    if (nextProps.updatedPollResults !== null) {
      this.props.dispatchGetAllPolls();
      this.props.dispatchResetUpdatedPollResults();
    }
    if (nextProps.deletedPoll !== null) {
      this.props.dispatchGetAllPolls();
      this.props.dispatchResetDeletedPoll();
    }
    if (nextProps.logoutRedirect) {
      this.props.dispatchGetAllPolls();
    }
  },
  componentWillUnmount: function componentWillUnmount() {
    if (this.props.flashMessages.length > 0) {
      this.props.dispatchClearAllFlashMessages();
    }
  },
  render: function render() {
    return _react2.default.createElement(
      'div',
      null,
      _react2.default.createElement(
        'h1',
        { className: 'view-title text-center' },
        'Latest Polls'
      ),
      _react2.default.createElement(
        'div',
        { className: 'row' },
        _react2.default.createElement(_DisplayPolls2.default, {
          polls: this.props.allPolls,
          clientIp: this.props.clientIp,
          user: this.props.user,
          isAuthenticated: this.props.isAuthenticated,
          dispatchSubmitVote: this.props.dispatchSubmitVote,
          getPolls: this.props.dispatchGetAllPolls
        })
      )
    );
  }
});

var mapStateToProps = function mapStateToProps(state) {
  return {
    user: state.user.user,
    isAuthenticated: state.user.isAuthenticated,
    logoutRedirect: state.user.logoutRedirect,
    clientIp: state.user.clientIp,
    allPolls: state.allPolls.allPolls,
    updatedPollResults: state.newVote.updatedResults,
    deletedPoll: state.deletedPoll.deletedPoll,
    flashMessages: state.flashMessages.flashMessages
  };
};

var mapDispatchToProps = function mapDispatchToProps(dispatch) {
  return {
    dispatchGetAllPolls: function dispatchGetAllPolls() {
      dispatch((0, _getAllPolls.getAllPolls)());
    },
    dispatchSubmitVote: function dispatchSubmitVote(id, vote) {
      dispatch((0, _submitVote.submitVote)(id, vote));
    },
    dispatchResetUpdatedPollResults: function dispatchResetUpdatedPollResults() {
      dispatch((0, _submitVote.resetUpdatedPollResults)());
    },
    dispatchResetDeletedPoll: function dispatchResetDeletedPoll() {
      dispatch((0, _deletePoll.resetDeletedPoll)());
    },
    dispatchClearAllFlashMessages: function dispatchClearAllFlashMessages() {
      dispatch((0, _flashMessage.clearAllFlashMessages)());
    }
  };
};

exports.default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(Home);