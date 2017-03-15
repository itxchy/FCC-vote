'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRedux = require('react-redux');

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _flashMessage = require('../../redux/modules/flashMessage');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _React$PropTypes = _react2.default.PropTypes,
    object = _React$PropTypes.object,
    func = _React$PropTypes.func;


var FlashMessage = _react2.default.createClass({
  displayName: 'FlashMessage',

  propTypes: {
    message: object.isRequired,
    dispatchDeleteFlashMessage: func.isRequired
  },

  onClick: function onClick() {
    this.props.dispatchDeleteFlashMessage(this.props.message.id);
  },
  render: function render() {
    var _props$message = this.props.message,
        messageType = _props$message.messageType,
        messageText = _props$message.messageText;

    return _react2.default.createElement(
      'div',
      { className: (0, _classnames2.default)('alert', {
          'alert-success': messageType === 'success',
          'alert-danger': messageType === 'error'
        }) },
      _react2.default.createElement(
        'button',
        { onClick: this.onClick, className: 'close' },
        _react2.default.createElement(
          'span',
          null,
          '\xD7'
        )
      ),
      messageText
    );
  }
});

var mapStateToProps = function mapStateToProps(state) {
  return {
    flashMessages: state.flashMessages.flashMessages
  };
};

var mapDispatchToProps = function mapDispatchToProps(dispatch) {
  return {
    dispatchDeleteFlashMessage: function dispatchDeleteFlashMessage(id) {
      dispatch((0, _flashMessage.deleteFlashMessage)(id));
    }
  };
};

exports.default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(FlashMessage);