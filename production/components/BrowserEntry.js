'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _ClientApp = require('./ClientApp');

var _ClientApp2 = _interopRequireDefault(_ClientApp);

require('../sass/main.scss');

require('jquery');

require('../sass/bootstrap-sass/assets/javascripts/bootstrap.js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_reactDom2.default.render(_react2.default.createElement(_ClientApp2.default, null), document.getElementById('app'));