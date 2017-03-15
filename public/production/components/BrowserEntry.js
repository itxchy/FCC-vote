'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _ClientApp = require('./ClientApp');

var _ClientApp2 = _interopRequireDefault(_ClientApp);

require('jquery');

require('../node_modules/bootstrap/dist/js/bootstrap.js');

require('../node_modules/bootstrap/dist/css/bootstrap.css');

require('../node_modules/font-awesome/css/font-awesome.css');

require('../css/main.css');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_reactDom2.default.render(_react2.default.createElement(_ClientApp2.default, null), document.getElementById('app'));