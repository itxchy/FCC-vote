'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRedux = require('react-redux');

var _FlashMessage = require('./FlashMessage');

var _FlashMessage2 = _interopRequireDefault(_FlashMessage);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var array = _react2.default.PropTypes.array;


var FlashMessagesList = _react2.default.createClass({
  displayName: 'FlashMessagesList',

  propTypes: {
    flashMessages: array.isRequired
  },
  render: function render() {
    var messages = this.props.flashMessages.map(function (message) {
      return _react2.default.createElement(_FlashMessage2.default, { key: message.id, message: message });
    });
    return _react2.default.createElement(
      'div',
      null,
      messages
    );
  }
});

var mapStateToProps = function mapStateToProps(state) {
  return {
    flashMessages: state.flashMessages.flashMessages
  };
};

exports.default = (0, _reactRedux.connect)(mapStateToProps)(FlashMessagesList);