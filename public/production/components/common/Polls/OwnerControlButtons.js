'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRouter = require('react-router');

var _DeleteModal = require('../DeleteModal');

var _DeleteModal2 = _interopRequireDefault(_DeleteModal);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _React$PropTypes = _react2.default.PropTypes,
    string = _React$PropTypes.string,
    object = _React$PropTypes.object,
    bool = _React$PropTypes.bool;


var OwnerControlButtons = _react2.default.createClass({
  displayName: 'OwnerControlButtons',

  propTypes: {
    id: string,
    owner: string,
    user: object,
    results: bool
  },
  render: function render() {
    var resultsControlButtons = _react2.default.createElement(
      'div',
      null,
      _react2.default.createElement(
        _reactRouter.Link,
        { to: '/edit/' + this.props.id },
        _react2.default.createElement('i', { className: 'fa fa-cog poll-edit-buttons poll-results-settings-button', 'aria-hidden': 'true' })
      ),
      _react2.default.createElement(
        'a',
        null,
        _react2.default.createElement('i', {
          className: 'fa fa-trash-o poll-edit-buttons poll-results-delete-button show-mouse-pointer',
          'data-toggle': 'modal',
          'data-target': '#deleteModal-' + this.props.id,
          'aria-hidden': 'true'
        })
      )
    );
    var pollCardControlButtons = _react2.default.createElement(
      'div',
      null,
      _react2.default.createElement(
        _reactRouter.Link,
        { to: '/edit/' + this.props.id },
        _react2.default.createElement('i', { className: 'fa fa-cog poll-edit-buttons poll-card-settings-button', 'aria-hidden': 'true' })
      ),
      _react2.default.createElement(
        'a',
        null,
        _react2.default.createElement('i', {
          className: 'fa fa-trash-o poll-edit-buttons poll-card-delete-button show-mouse-pointer',
          'data-toggle': 'modal',
          'data-target': '#deleteModal-' + this.props.id,
          'aria-hidden': 'true'
        })
      )
    );
    var controlButtons = this.props.results ? resultsControlButtons : pollCardControlButtons;
    var pollOwner = null;
    if (this.props.user) {
      pollOwner = this.props.owner === this.props.user.username;
    }
    return _react2.default.createElement(
      'div',
      null,
      pollOwner ? controlButtons : null,
      _react2.default.createElement(_DeleteModal2.default, { id: this.props.id })
    );
  }
});

exports.default = OwnerControlButtons;