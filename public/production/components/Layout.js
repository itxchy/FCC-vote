'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _NavBar = require('./NavBar');

var _NavBar2 = _interopRequireDefault(_NavBar);

var _FlashMessagesList = require('./common/FlashMessagesList');

var _FlashMessagesList2 = _interopRequireDefault(_FlashMessagesList);

var _Store = require('../redux/Store');

var _Store2 = _interopRequireDefault(_Store);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var element = _react2.default.PropTypes.element;


var Layout = function Layout(props) {
  return _react2.default.createElement(
    'div',
    { className: 'container' },
    _react2.default.createElement(_NavBar2.default, { store: _Store2.default }),
    _react2.default.createElement(_FlashMessagesList2.default, { store: _Store2.default }),
    props.children
  );
};

Layout.propTypes = {
  children: element.isRequired
};

exports.default = Layout;