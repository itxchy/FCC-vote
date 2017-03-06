'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRouter = require('react-router');

var _Store = require('../redux/Store');

var _Store2 = _interopRequireDefault(_Store);

var _auth = require('../redux/modules/auth');

var _reactRedux = require('react-redux');

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var _setAuthorizationToken = require('../auth/setAuthorizationToken');

var _setAuthorizationToken2 = _interopRequireDefault(_setAuthorizationToken);

var _Routes = require('./Routes');

var _Routes2 = _interopRequireDefault(_Routes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import { createHistory, useBasename } from 'history'
// const browserHistory = useBasename(createHistory)({
//   basename: '/'
// })

/* global localStorage */

var App = _react2.default.createClass({
  displayName: 'App',
  render: function render() {
    if (localStorage.jwtToken) {
      (0, _setAuthorizationToken2.default)(localStorage.jwtToken);
      var decodedToken = _jsonwebtoken2.default.decode(localStorage.jwtToken);
      // store.dispatch({type: SET_CURRENT_USER, user: jwt.decode(localStorage.jwtToken)})
      _Store2.default.dispatch((0, _auth.setCurrentUser)(decodedToken));
    } else {
      _Store2.default.dispatch((0, _auth.getClientIp)());
      _Store2.default.dispatch((0, _auth.setCurrentUser)({}));
    }
    return _react2.default.createElement(
      _reactRedux.Provider,
      { store: _Store2.default },
      _react2.default.createElement(
        _reactRouter.Router,
        { history: _reactRouter.browserHistory },
        (0, _Routes2.default)()
      )
    );
  }
});

exports.default = App;