'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _React$PropTypes = _react2.default.PropTypes,
    object = _React$PropTypes.object,
    func = _React$PropTypes.func;


var PendingPollOptions = _react2.default.createClass({
  displayName: 'PendingPollOptions',

  propTypes: {
    poll: object.isRequired,
    dispatchUpdateOption: func.isRequired
  },
  getInitialState: function getInitialState() {
    return {
      twoOptionsOrMoreError: false
    };
  },
  onFocus: function onFocus() {
    this.setState({ twoOptionsOrMoreError: false });
  },
  editOption: function editOption(event) {
    this.setState({ twoOptionsOrMoreError: false });
    var updatedOptions = this.props.poll.newPollOptions;
    updatedOptions[event.target.name] = event.target.value;
    this.props.dispatchUpdateOption(updatedOptions);
  },
  addAnotherOption: function addAnotherOption() {
    this.setState({ twoOptionsOrMoreError: false });
    var updatedNewOptions = this.props.poll.newPollOptions;
    updatedNewOptions.push('');
    this.props.dispatchUpdateOption(updatedNewOptions);
  },
  deleteOption: function deleteOption(index) {
    if (this.props.poll.newPollOptions.length === 2) {
      console.log('Two or more options required!');
      this.setState({ twoOptionsOrMoreError: true });
      return;
    }
    var updatedDeleteOptions = this.props.poll.newPollOptions;
    updatedDeleteOptions.splice(index, 1);
    this.props.dispatchUpdateOption(updatedDeleteOptions);
  },
  render: function render() {
    var _this = this;

    var options = this.props.poll.newPollOptions.map(function (option, index) {
      return _react2.default.createElement(
        'div',
        { key: index },
        _react2.default.createElement('input', {
          type: 'text',
          value: option,
          name: index,
          placeholder: 'Option ' + (index + 1),
          onChange: _this.editOption,
          onFocus: _this.onFocus,
          className: 'form-control option-input'
        }),
        _react2.default.createElement(
          'a',
          {
            className: 'btn btn-danger delete-button',
            onClick: function onClick() {
              return _this.deleteOption(index);
            },
            'aria-label': 'Delete'
          },
          _react2.default.createElement('i', { className: 'fa fa-trash-o', 'aria-hidden': 'true' })
        )
      );
    });
    var deleteOptionError = _react2.default.createElement(
      'div',
      { className: 'row two-or-more-error' },
      _react2.default.createElement('i', { className: 'fa fa-exclamation-triangle', 'aria-hidden': 'true' }),
      ' At least two options are required'
    );
    return _react2.default.createElement(
      'div',
      { className: 'form-group options-container' },
      options,
      this.state.twoOptionsOrMoreError ? deleteOptionError : null,
      _react2.default.createElement(
        'a',
        null,
        _react2.default.createElement(
          'p',
          { className: 'add-another-option show-mouse-pointer', onClick: this.addAnotherOption },
          _react2.default.createElement('i', { className: 'fa fa-plus-circle', 'aria-hidden': 'true' }),
          ' Add another option'
        )
      )
    );
  }
});

exports.default = PendingPollOptions;