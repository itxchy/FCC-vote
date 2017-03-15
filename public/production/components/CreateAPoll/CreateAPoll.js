'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _NewPollTitle = require('../common/PollForms/NewPollTitle');

var _NewPollTitle2 = _interopRequireDefault(_NewPollTitle);

var _PendingPollOptions = require('../common/PollForms/PendingPollOptions');

var _PendingPollOptions2 = _interopRequireDefault(_PendingPollOptions);

var _SaveOrReset = require('../common/PollForms/SaveOrReset');

var _SaveOrReset2 = _interopRequireDefault(_SaveOrReset);

var _reactRedux = require('react-redux');

var _createNewPoll = require('../../redux/modules/createNewPoll');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _React$PropTypes = _react2.default.PropTypes,
    object = _React$PropTypes.object,
    func = _React$PropTypes.func,
    string = _React$PropTypes.string,
    bool = _React$PropTypes.bool,
    array = _React$PropTypes.array;


var CreateAPoll = _react2.default.createClass({
  displayName: 'CreateAPoll',

  propTypes: {
    poll: object,
    dispatchUpdateOption: func.isRequired,
    newPollTitle: string,
    titleEditable: bool,
    dispatchSetNewPollTitle: func.isRequired,
    dispatchSetTitleEditable: func.isRequired,
    newPollOptions: array,
    dispatchSubmitPoll: func.isRequired,
    dispatchResetNewPoll: func.isRequired,
    dispatchResetPollSaved: func.isRequired,
    pollSaved: string,
    user: object
  },
  componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
    if (nextProps.pollSaved) {
      this.context.router.push('/v/' + nextProps.pollSaved);
      this.props.dispatchResetPollSaved();
    }
  },
  render: function render() {
    var newPoll = true;
    return _react2.default.createElement(
      'div',
      null,
      _react2.default.createElement(
        'h1',
        { className: 'view-title text-center' },
        'Create a New Poll'
      ),
      _react2.default.createElement(_NewPollTitle2.default, {
        newPollTitle: this.props.newPollTitle,
        titleEditable: this.props.titleEditable,
        dispatchSetNewPollTitle: this.props.dispatchSetNewPollTitle,
        dispatchSetTitleEditable: this.props.dispatchSetTitleEditable
      }),
      _react2.default.createElement(_PendingPollOptions2.default, {
        poll: this.props.poll,
        dispatchUpdateOption: this.props.dispatchUpdateOption
      }),
      _react2.default.createElement(_SaveOrReset2.default, {
        newPollTitle: this.props.newPollTitle,
        newPollOptions: this.props.newPollOptions,
        dispatchResetNewPoll: this.props.dispatchResetNewPoll,
        dispatchSubmitPoll: this.props.dispatchSubmitPoll,
        user: this.props.user,
        poll: this.props.poll,
        newPoll: newPoll,
        pollID: null
      })
    );
  }
});

CreateAPoll.contextTypes = {
  router: object.isRequired
};

var mapStateToProps = function mapStateToProps(state) {
  return {
    poll: state.newPoll,
    newPollTitle: state.newPoll.newPollTitle,
    titleEditable: state.newPoll.titleEditable,
    newPollOptions: state.newPoll.newPollOptions,
    pollSaved: state.newPoll.pollSaved,
    user: state.user
  };
};

var mapDispatchToProps = function mapDispatchToProps(dispatch) {
  return {
    dispatchUpdateOption: function dispatchUpdateOption(newOptions) {
      dispatch((0, _createNewPoll.updateOption)(newOptions));
    },
    dispatchSetNewPollTitle: function dispatchSetNewPollTitle(pollTitle) {
      dispatch((0, _createNewPoll.setNewPollTitle)(pollTitle));
    },
    dispatchSetTitleEditable: function dispatchSetTitleEditable(bool) {
      dispatch((0, _createNewPoll.setTitleEditable)(bool));
    },
    dispatchResetNewPoll: function dispatchResetNewPoll(newPoll) {
      dispatch((0, _createNewPoll.resetNewPoll)());
    },
    dispatchSubmitPoll: function dispatchSubmitPoll(newPoll) {
      dispatch((0, _createNewPoll.submitNewPoll)(newPoll));
    },
    dispatchResetPollSaved: function dispatchResetPollSaved() {
      dispatch((0, _createNewPoll.resetPollSaved)());
    }
  };
};

exports.default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(CreateAPoll);