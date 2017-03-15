'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Routes = undefined;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRouter = require('react-router');

var _Layout = require('./Layout');

var _Layout2 = _interopRequireDefault(_Layout);

var _Home = require('./Home');

var _Home2 = _interopRequireDefault(_Home);

var _CreateAPoll = require('./CreateAPoll/CreateAPoll');

var _CreateAPoll2 = _interopRequireDefault(_CreateAPoll);

var _EditPoll = require('./EditPoll/EditPoll');

var _EditPoll2 = _interopRequireDefault(_EditPoll);

var _Signup = require('./Signup/Signup');

var _Signup2 = _interopRequireDefault(_Signup);

var _LoginPage = require('./Login/LoginPage');

var _LoginPage2 = _interopRequireDefault(_LoginPage);

var _MyPollsPage = require('./MyPolls/MyPollsPage');

var _MyPollsPage2 = _interopRequireDefault(_MyPollsPage);

var _SinglePoll = require('./SinglePoll');

var _SinglePoll2 = _interopRequireDefault(_SinglePoll);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Routes = exports.Routes = function Routes() {
  return _react2.default.createElement(
    _reactRouter.Route,
    { path: '/', component: _Layout2.default },
    _react2.default.createElement(_reactRouter.IndexRoute, { component: _Home2.default }),
    _react2.default.createElement(_reactRouter.Route, { path: 'create', component: _CreateAPoll2.default }),
    _react2.default.createElement(_reactRouter.Route, { path: 'edit/:id', component: _EditPoll2.default }),
    _react2.default.createElement(_reactRouter.Route, { path: 'mypolls', component: _MyPollsPage2.default }),
    _react2.default.createElement(_reactRouter.Route, { path: 'signup', component: _Signup2.default }),
    _react2.default.createElement(_reactRouter.Route, { path: 'login', component: _LoginPage2.default }),
    _react2.default.createElement(_reactRouter.Route, { path: 'v/:id', component: _SinglePoll2.default })
  );
};

exports.default = Routes;