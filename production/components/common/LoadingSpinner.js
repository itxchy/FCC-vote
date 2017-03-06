'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var LoadingSpinner = function LoadingSpinner() {
  return _react2.default.createElement(
    'div',
    { className: 'center-div-horizontally loading-spinner-container' },
    _react2.default.createElement('i', { className: 'fa fa-cog fa-spin fa-3x fa-fw loading-spinner' })
  );
};

exports.default = LoadingSpinner;