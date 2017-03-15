'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRedux = require('react-redux');

var _getSinglePoll = require('../redux/modules/getSinglePoll');

var _deletePoll = require('../redux/modules/deletePoll');

var _submitVote = require('../redux/modules/submitVote');

var _flashMessage = require('../redux/modules/flashMessage');

var _DisplayPolls = require('./common/Polls/DisplayPolls');

var _DisplayPolls2 = _interopRequireDefault(_DisplayPolls);

var _LoadingSpinner = require('./common/LoadingSpinner');

var _LoadingSpinner2 = _interopRequireDefault(_LoadingSpinner);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _React$PropTypes = _react2.default.PropTypes,
    object = _React$PropTypes.object,
    func = _React$PropTypes.func,
    array = _React$PropTypes.array,
    string = _React$PropTypes.string,
    bool = _React$PropTypes.bool;


var SinglePoll = _react2.default.createClass({
  displayName: 'SinglePoll',

  propTypes: {
    routeParams: object,
    singlePoll: array,
    user: object,
    clientIp: string,
    isAuthenticated: bool,
    dispatchGetSinglePoll: func,
    dispatchSubmitVote: func,
    dispatchClearSinglePoll: func,
    dispatchResetDeletedPoll: func,
    dispatchResetUpdatedPollResults: func,
    dispatchClearAllFlashMessages: func,
    updatedPollResults: object,
    deletedPoll: string,
    flashMessages: array
  },
  getPoll: function getPoll() {
    this.props.dispatchGetSinglePoll(this.props.routeParams.id);
  },
  componentWillMount: function componentWillMount() {
    this.props.dispatchClearSinglePoll();
    this.getPoll();
  },
  componentWillUnmount: function componentWillUnmount() {
    this.props.dispatchClearSinglePoll();
    if (this.props.flashMessages.length > 0) {
      this.props.dispatchClearAllFlashMessages();
    }
  },
  componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
    if (nextProps.updatedPollResults !== null) {
      this.getPoll();
      this.props.dispatchResetUpdatedPollResults();
    }
    if (nextProps.deletedPoll !== null) {
      this.context.router.push('/');
      this.props.dispatchResetDeletedPoll();
    }
  },
  render: function render() {
    var loading = _react2.default.createElement(_LoadingSpinner2.default, null);
    var singlePoll = _react2.default.createElement(
      'div',
      { className: 'center-div-horizontally' },
      _react2.default.createElement(_DisplayPolls2.default, {
        polls: this.props.singlePoll,
        clientIp: this.props.clientIp,
        user: this.props.user,
        isAuthenticated: this.props.isAuthenticated,
        dispatchSubmitVote: this.props.dispatchSubmitVote,
        getPolls: this.getPoll
      })
    );
    return _react2.default.createElement(
      'div',
      { className: 'center-div-horizontally' },
      this.props.singlePoll ? singlePoll : loading
    );
  }
});

SinglePoll.contextTypes = {
  router: object.isRequired
};

var mapStateToProps = function mapStateToProps(state) {
  return {
    singlePoll: state.singlePoll.singlePoll,
    user: state.user.user,
    isAuthenticated: state.user.isAuthenticated,
    clientIp: state.user.clientIp,
    updatedPollResults: state.newVote.updatedResults,
    deletedPoll: state.deletedPoll.deletedPoll,
    flashMessages: state.flashMessages.flashMessages
  };
};

var mapDispatchToProps = function mapDispatchToProps(dispatch) {
  return {
    dispatchGetSinglePoll: function dispatchGetSinglePoll(id) {
      dispatch((0, _getSinglePoll.getSinglePoll)(id));
    },
    dispatchSubmitVote: function dispatchSubmitVote(id, vote) {
      dispatch((0, _submitVote.submitVote)(id, vote));
    },
    dispatchClearSinglePoll: function dispatchClearSinglePoll() {
      dispatch((0, _getSinglePoll.clearSinglePoll)());
    },
    dispatchResetDeletedPoll: function dispatchResetDeletedPoll() {
      dispatch((0, _deletePoll.resetDeletedPoll)());
    },
    dispatchResetUpdatedPollResults: function dispatchResetUpdatedPollResults() {
      dispatch((0, _submitVote.resetUpdatedPollResults)());
    },
    dispatchClearAllFlashMessages: function dispatchClearAllFlashMessages() {
      dispatch((0, _flashMessage.clearAllFlashMessages)());
    }
  };
};

exports.default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(SinglePoll);