'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRedux = require('react-redux');

var _reactRouter = require('react-router');

var _auth = require('../redux/modules/auth');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _React$PropTypes = _react2.default.PropTypes,
    object = _React$PropTypes.object,
    func = _React$PropTypes.func,
    any = _React$PropTypes.any;


var NavBar = _react2.default.createClass({
  displayName: 'NavBar',

  propTypes: {
    user: any,
    dispatchLogout: func.isRequired,
    dispatchGetClientIp: func.isRequired
  },
  getInitialState: function getInitialState() {
    return {
      isMounted: false
    };
  },
  logout: function logout(event) {
    event.preventDefault();
    this.props.dispatchLogout();
    this.props.dispatchGetClientIp();
    this.context.router.push('/');
  },
  componentDidMount: function componentDidMount() {
    this.setState({ isMounted: true });
  },
  render: function render() {
    var username = this.props.user.user ? this.props.user.user.username : null;
    var showAuthenticatedNav = _react2.default.createElement(
      'div',
      { className: 'collapse navbar-collapse', id: 'bs-example-navbar-collapse-1' },
      _react2.default.createElement(
        'ul',
        { className: 'nav navbar-nav' },
        _react2.default.createElement(
          'li',
          null,
          _react2.default.createElement(
            _reactRouter.Link,
            { to: '/mypolls' },
            'My Polls'
          )
        ),
        _react2.default.createElement(
          'li',
          null,
          _react2.default.createElement(
            _reactRouter.Link,
            { to: '/create' },
            'Create a Poll'
          )
        )
      ),
      _react2.default.createElement(
        'ul',
        { className: 'nav navbar-nav navbar-right' },
        _react2.default.createElement(
          'li',
          null,
          _react2.default.createElement(
            'p',
            { className: 'navbar-text' },
            'Welcome back, ',
            username,
            '!'
          )
        ),
        _react2.default.createElement(
          'li',
          null,
          _react2.default.createElement(
            'a',
            { href: '#', onClick: this.logout },
            'Logout'
          )
        )
      )
    );

    var showGuestNav = _react2.default.createElement(
      'div',
      { className: 'collapse navbar-collapse', id: 'bs-example-navbar-collapse-1' },
      _react2.default.createElement(
        'ul',
        { className: 'nav navbar-nav navbar-right' },
        _react2.default.createElement(
          'li',
          null,
          _react2.default.createElement(
            _reactRouter.Link,
            { to: '/signup' },
            'Sign up'
          )
        ),
        _react2.default.createElement(
          'li',
          null,
          _react2.default.createElement(
            _reactRouter.Link,
            { to: '/login' },
            'Login'
          )
        )
      )
    );
    return _react2.default.createElement(
      'nav',
      { className: 'navbar navbar-default vote-nav' },
      _react2.default.createElement(
        'div',
        { className: 'container-fluid' },
        _react2.default.createElement(
          'div',
          { className: 'navbar-header' },
          _react2.default.createElement(
            'button',
            { type: 'button', className: 'navbar-toggle collapsed', 'data-toggle': 'collapse', 'data-target': '#bs-example-navbar-collapse-1', 'aria-expanded': 'false' },
            _react2.default.createElement(
              'span',
              { className: 'sr-only' },
              'Toggle navigation'
            ),
            _react2.default.createElement('span', { className: 'icon-bar' }),
            _react2.default.createElement('span', { className: 'icon-bar' }),
            _react2.default.createElement('span', { className: 'icon-bar' })
          ),
          _react2.default.createElement(
            _reactRouter.Link,
            { to: '/', className: 'navbar-brand' },
            'Vote.'
          )
        ),
        this.state.isMounted && this.props.user.isAuthenticated ? showAuthenticatedNav : showGuestNav
      )
    );
  }
});

NavBar.contextTypes = {
  router: object.isRequired
};

var mapStateToProps = function mapStateToProps(state) {
  return {
    user: state.user
  };
};

var mapDispatchToProps = function mapDispatchToProps(dispatch) {
  return {
    dispatchLogout: function dispatchLogout() {
      dispatch((0, _auth.logout)());
    },
    dispatchGetClientIp: function dispatchGetClientIp() {
      dispatch((0, _auth.getClientIp)());
    }
  };
};

exports.default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(NavBar);