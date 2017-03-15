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

var _editPoll = require('../../redux/modules/editPoll');

var _getSinglePoll = require('../../redux/modules/getSinglePoll');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _React$PropTypes = _react2.default.PropTypes,
    object = _React$PropTypes.object,
    func = _React$PropTypes.func,
    bool = _React$PropTypes.bool,
    string = _React$PropTypes.string,
    array = _React$PropTypes.array;


var EditPoll = _react2.default.createClass({
  displayName: 'EditPoll',

  propTypes: {
    poll: object,
    newPollTitle: string,
    newPollOptions: array,
    titleEditable: bool,
    dispatchUpdateOption: func,
    dispatchResetNewPoll: func,
    dispatchSubmitPoll: func,
    dispatchSetNewPollTitle: func,
    dispatchSetTitleEditable: func,
    dispatchGetPollData: func,
    dispatchClearSinglePoll: func,
    user: object,
    isAuthenticated: bool,
    routeParams: object.isRequired,
    editedPoll: object
  },
  componentWillMount: function componentWillMount() {
    this.props.dispatchGetPollData(this.props.routeParams.id);
  },
  componentWillUnmount: function componentWillUnmount() {
    this.props.dispatchResetNewPoll();
  },
  componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
    if (nextProps.editedPoll !== null) {
      this.props.dispatchClearSinglePoll();
      this.context.router.push('/v/' + this.props.routeParams.id);
    }
    if (nextProps.isAuthenticated === false) {
      this.context.router.push('/');
    }
  },
  render: function render() {
    var newPoll = false;
    var fields = _react2.default.createElement(
      'div',
      null,
      _react2.default.createElement(
        'h1',
        { className: 'view-title text-center' },
        'Editing...'
      ),
      _react2.default.createElement(_NewPollTitle2.default, {
        newPollTitle: this.props.newPollTitle,
        titleEditable: this.props.titleEditable,
        dispatchSetNewPollTitle: this.props.dispatchSetNewPollTitle,
        dispatchSetTitleEditable: this.props.dispatchSetTitleEditable,
        editPoll: true
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
        pollID: this.props.routeParams.id
      }),
      _react2.default.createElement(
        'div',
        { className: 'alert alert-warning edit-warning', role: 'alert' },
        _react2.default.createElement(
          'strong',
          null,
          'Remember'
        ),
        ': Submitting an edit to this poll will erase all of its votes.'
      )
    );
    // if the title isn't an empty string, display fields. This prevents a text flash
    // after rerender. Hacky fix for now.
    var receivedTitle = this.props.newPollTitle !== '';
    return _react2.default.createElement(
      'div',
      null,
      receivedTitle ? fields : null
    );
  }
});

EditPoll.contextTypes = {
  router: object.isRequired
};

var mapStateToProps = function mapStateToProps(state) {
  return {
    poll: state.editPoll,
    newPollTitle: state.editPoll.newPollTitle,
    newPollOptions: state.editPoll.newPollOptions,
    titleEditable: state.editPoll.titleEditable,
    user: state.user,
    isAuthenticated: state.user.isAuthenticated,
    editedPoll: state.editPoll.editedPoll
  };
};

var mapDispatchToProps = function mapDispatchToProps(dispatch) {
  return {
    dispatchUpdateOption: function dispatchUpdateOption(newOptions) {
      dispatch((0, _editPoll.setPollOptions)(newOptions));
    },
    dispatchSetNewPollTitle: function dispatchSetNewPollTitle(pollTitle) {
      dispatch((0, _editPoll.setPollTitle)(pollTitle));
    },
    dispatchSetTitleEditable: function dispatchSetTitleEditable(bool) {
      dispatch((0, _editPoll.setTitleEditable)(bool));
    },
    dispatchResetNewPoll: function dispatchResetNewPoll(newPoll) {
      dispatch((0, _editPoll.resetPoll)());
    },
    dispatchSubmitPoll: function dispatchSubmitPoll(id, pollData) {
      dispatch((0, _editPoll.setEditedPoll)(id, pollData));
    },
    dispatchGetPollData: function dispatchGetPollData(id) {
      dispatch((0, _editPoll.getPollData)(id));
    },
    dispatchClearSinglePoll: function dispatchClearSinglePoll() {
      dispatch((0, _getSinglePoll.clearSinglePoll)());
    }
  };
};

exports.default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(EditPoll);