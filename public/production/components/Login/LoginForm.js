'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRedux = require('react-redux');

var _TextFieldGroup = require('../common/TextFieldGroup');

var _TextFieldGroup2 = _interopRequireDefault(_TextFieldGroup);

var _loginValidation = require('../../server/routes/shared/loginValidation');

var _loginValidation2 = _interopRequireDefault(_loginValidation);

var _auth = require('../../redux/modules/auth');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var _React$PropTypes = _react2.default.PropTypes,
    func = _React$PropTypes.func,
    object = _React$PropTypes.object,
    bool = _React$PropTypes.bool,
    shape = _React$PropTypes.shape;


var LoginForm = _react2.default.createClass({
  displayName: 'LoginForm',

  propTypes: {
    dispatchLogin: func.isRequired,
    user: shape({
      isAuthenticated: bool,
      user: object,
      errors: object,
      userLoading: bool
    })
  },
  getInitialState: function getInitialState() {
    return {
      identifier: '',
      password: '',
      errors: {
        identifier: null,
        passwords: null
      }
    };
  },
  isValid: function isValid() {
    var _validateInput = (0, _loginValidation2.default)(this.state),
        errors = _validateInput.errors,
        isValid = _validateInput.isValid;

    if (!isValid) {
      this.setState({ errors: errors });
    }
    return isValid;
  },
  onSubmit: function onSubmit(event) {
    event.preventDefault();
    if (this.isValid()) {
      this.setState({ errors: {} });
      this.props.dispatchLogin(this.state);
    }
  },
  onChange: function onChange(event) {
    this.setState(_defineProperty({}, event.target.name, event.target.value));
  },
  componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
    if (nextProps.user.isAuthenticated) {
      this.context.router.push('/');
    }
  },
  componentWillMount: function componentWillMount() {
    if (this.props.user.isAuthenticated) {
      this.context.router.push('/');
    }
  },
  render: function render() {
    var loginErrors = { form: null, server: null };
    if (this.props.user.errors) {
      loginErrors = this.props.user.errors;
    }
    var _state = this.state,
        errors = _state.errors,
        identifier = _state.identifier,
        password = _state.password;


    return _react2.default.createElement(
      'form',
      { onSubmit: this.onSubmit },
      _react2.default.createElement(
        'h1',
        null,
        'Login'
      ),
      loginErrors.form && _react2.default.createElement(
        'div',
        { className: 'alert alert-danger' },
        loginErrors.form
      ),
      loginErrors.server && _react2.default.createElement(
        'div',
        { className: 'alert alert-danger' },
        loginErrors.server
      ),
      _react2.default.createElement(_TextFieldGroup2.default, {
        field: 'identifier',
        label: 'Username / Email',
        value: identifier,
        error: errors.identifier,
        onChange: this.onChange
      }),
      _react2.default.createElement(_TextFieldGroup2.default, {
        field: 'password',
        label: 'Password',
        value: password,
        error: errors.password,
        onChange: this.onChange,
        type: 'password'
      }),
      _react2.default.createElement(
        'div',
        { className: 'form-group' },
        _react2.default.createElement(
          'button',
          { className: 'button btn btn-primary btn-lg', disabled: this.props.user.userLoading },
          'Login'
        )
      )
    );
  }
});

LoginForm.contextTypes = {
  router: object.isRequired
};

var mapStateToProps = function mapStateToProps(state) {
  return {
    user: state.user
  };
};

var mapDispatchToProps = function mapDispatchToProps(dispatch) {
  return {
    dispatchLogin: function dispatchLogin(credentials) {
      dispatch((0, _auth.login)(credentials));
    }
  };
};

exports.default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(LoginForm);