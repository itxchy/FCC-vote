'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRedux = require('react-redux');

var _DisplayPolls = require('../common/DisplayPolls');

var _DisplayPolls2 = _interopRequireDefault(_DisplayPolls);

var _getUserPolls = require('../../redux/modules/getUserPolls');

var _submitVote = require('../../redux/modules/submitVote');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _React$PropTypes = _react2.default.PropTypes,
    func = _React$PropTypes.func,
    object = _React$PropTypes.object,
    array = _React$PropTypes.array,
    bool = _React$PropTypes.bool,
    string = _React$PropTypes.string;


var MyPollsPage = _react2.default.createClass({
  displayName: 'MyPollsPage',

  propTypes: {
    dispatchGetUserPolls: func.isRequired,
    dispatchSubmitVote: func.isRequired,
    dispatchResetUpdatedPollResults: func.isRequired,
    dispatchClearUserPolls: func.isRequired,
    clientIp: string,
    isAuthenticated: bool,
    updatedPollResults: object,
    user: object,
    userPolls: array
  },
  getUserPolls: function getUserPolls() {
    if (this.props.user) {
      var username = this.props.user.username;
      if (username) {
        this.props.dispatchGetUserPolls(username);
      }
    }
  },
  componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
    // If a new vote was accepted, the relevent poll card should be
    // flipped to a results card including the newest vote.
    if (nextProps.updatedPollResults !== null || nextProps.user !== this.props.user) {
      this.getUserPolls();
      this.props.dispatchResetUpdatedPollResults();
    }
    if (nextProps.isAuthenticated === false) {
      this.context.router.push('/');
    }
  },
  componentWillUnmount: function componentWillUnmount() {
    this.props.dispatchClearUserPolls();
  },
  render: function render() {
    console.log('MyPollsPage this.props.user', this.props.user);
    console.log('MyPollsPage this.props.userPolls', this.props.userPolls);
    var polls = this.props.userPolls ? this.props.userPolls : null;
    return _react2.default.createElement(
      'div',
      null,
      _react2.default.createElement(
        'h1',
        { className: 'view-title text-center' },
        'My Poll Results'
      ),
      _react2.default.createElement(_DisplayPolls2.default, {
        polls: polls,
        clientIp: this.props.clientIp,
        user: this.props.user,
        isAuthenticated: this.props.isAuthenticated,
        dispatchSubmitVote: this.props.dispatchSubmitVote,
        getPolls: this.getUserPolls,
        myPolls: true
      })
    );
  }
});

MyPollsPage.contextTypes = {
  router: object.isRequired
};

var mapStateToProps = function mapStateToProps(state) {
  return {
    user: state.user.user,
    isAuthenticated: state.user.isAuthenticated,
    clientIp: state.user.clientIp,
    userPolls: state.userPolls.userPolls,
    updatedPollResults: state.newVote.updatedResults
  };
};

var mapDispatchToProps = function mapDispatchToProps(dispatch) {
  return {
    dispatchGetUserPolls: function dispatchGetUserPolls(username) {
      dispatch((0, _getUserPolls.getUserPolls)(username));
    },
    dispatchSubmitVote: function dispatchSubmitVote(id, vote) {
      dispatch((0, _submitVote.submitVote)(id, vote));
    },
    dispatchResetUpdatedPollResults: function dispatchResetUpdatedPollResults() {
      dispatch((0, _submitVote.resetUpdatedPollResults)());
    },
    dispatchClearUserPolls: function dispatchClearUserPolls() {
      dispatch((0, _getUserPolls.clearUserPolls)());
    }
  };
};

exports.default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(MyPollsPage);