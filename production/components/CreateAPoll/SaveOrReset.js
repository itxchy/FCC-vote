'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _createAPollValidation = require('../../routes/shared/createAPollValidation');

var _createAPollValidation2 = _interopRequireDefault(_createAPollValidation);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _React$PropTypes = _react2.default.PropTypes,
    string = _React$PropTypes.string,
    func = _React$PropTypes.func,
    array = _React$PropTypes.array,
    object = _React$PropTypes.object,
    bool = _React$PropTypes.bool;


var SaveOrReset = _react2.default.createClass({
  displayName: 'SaveOrReset',

  propTypes: {
    newPollTitle: string,
    newPollOptions: array,
    dispatchResetNewPoll: func,
    dispatchSubmitPoll: func.isRequired,
    user: object.isRequired,
    poll: object,
    newPoll: bool.isRequired,
    pollID: string
  },
  getInitialState: function getInitialState() {
    return {
      errors: {}
    };
  },
  isValid: function isValid() {
    var inputData = {
      newPollTitle: this.props.newPollTitle,
      newPollOptions: this.props.newPollOptions
    };

    var _validateCreateAPollI = (0, _createAPollValidation2.default)(inputData),
        errors = _validateCreateAPollI.errors,
        isValid = _validateCreateAPollI.isValid;

    if (!isValid) {
      this.setState({ errors: errors });
    }
    return isValid;
  },
  saveButtonHandler: function saveButtonHandler() {
    if (this.isValid()) {
      var newPoll = {
        title: this.props.newPollTitle,
        options: this.props.newPollOptions,
        owner: this.props.user.user.username
      };
      this.props.newPoll ? this.props.dispatchSubmitPoll(newPoll) : this.props.dispatchSubmitPoll(this.props.pollID, newPoll);
    }
  },
  resetButtonHandler: function resetButtonHandler() {
    this.props.dispatchResetNewPoll();
  },
  render: function render() {
    // TODO: move this error to redux to allow this dialog to be cleared when focusing on the blank option
    var blankOptionError = _react2.default.createElement(
      'div',
      { className: 'row two-or-more-error' },
      _react2.default.createElement('i', { className: 'fa fa-exclamation-triangle', 'aria-hidden': 'true' }),
      ' Blank options are not allowed'
    );
    return _react2.default.createElement(
      'div',
      { className: 'text-center' },
      this.state.errors.newPollOptions ? blankOptionError : null,
      _react2.default.createElement(
        'button',
        {
          className: 'btn btn-primary save-reset-buttons',
          onClick: this.saveButtonHandler
        },
        'Submit'
      ),
      _react2.default.createElement(
        'button',
        {
          className: 'btn save-reset-buttons reset-poll-button',
          onClick: this.resetButtonHandler
        },
        'Reset'
      )
    );
  }
});

exports.default = SaveOrReset;