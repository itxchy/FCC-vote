'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _React$PropTypes = _react2.default.PropTypes,
    string = _React$PropTypes.string,
    func = _React$PropTypes.func,
    bool = _React$PropTypes.bool;


var NewPollTitle = _react2.default.createClass({
  displayName: 'NewPollTitle',

  propTypes: {
    newPollTitle: string,
    titleEditable: bool,
    dispatchSetNewPollTitle: func,
    dispatchSetTitleEditable: func,
    editPoll: bool
  },
  handleNewPollTitleChange: function handleNewPollTitleChange(event) {
    this.props.dispatchSetNewPollTitle(event.target.value);
  },
  handleSaveClick: function handleSaveClick(event) {
    if (this.props.newPollTitle === '') {
      this.props.dispatchSetNewPollTitle('New Poll Title');
    }
    this.props.dispatchSetTitleEditable(false);
  },
  handleEditClick: function handleEditClick(event) {
    this.props.dispatchSetTitleEditable(true);
  },
  render: function render() {
    var savedPollTitle = _react2.default.createElement(
      'div',
      { className: 'new-poll-title-container' },
      _react2.default.createElement(
        'h2',
        { className: 'text-center saved-title' },
        this.props.newPollTitle
      ),
      _react2.default.createElement(
        'a',
        null,
        _react2.default.createElement('i', {
          className: 'fa fa-pencil-square-o edit-icon show-mouse-pointer',
          'aria-hidden': 'true',
          onClick: this.handleEditClick
        })
      )
    );
    var inputPollTitle = _react2.default.createElement(
      'div',
      { className: 'new-poll-title-container' },
      _react2.default.createElement('textarea', {
        value: this.props.newPollTitle,
        onChange: this.handleNewPollTitleChange,
        type: 'text',
        placeholder: 'New Poll Title',
        className: 'text-center form-control new-poll-title-textarea'
      }),
      _react2.default.createElement(
        'a',
        null,
        _react2.default.createElement('i', {
          className: 'fa fa-floppy-o save-icon show-mouse-pointer',
          'aria-hidden': 'true',
          onClick: this.handleSaveClick
        })
      )
    );

    return _react2.default.createElement(
      'div',
      { className: 'new-poll-title-container' },
      this.props.titleEditable ? inputPollTitle : savedPollTitle
    );
  }
});

exports.default = NewPollTitle;