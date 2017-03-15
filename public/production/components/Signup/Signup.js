'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRedux = require('react-redux');

var _signupValidation = require('../../server/routes/shared/signupValidation');

var _signupValidation2 = _interopRequireDefault(_signupValidation);

var _TextFieldGroup = require('../common/TextFieldGroup');

var _TextFieldGroup2 = _interopRequireDefault(_TextFieldGroup);

var _userSignupRequest = require('../../redux/modules/userSignupRequest');

var _flashMessage = require('../../redux/modules/flashMessage');

var _clientFormValidation = require('../../redux/modules/clientFormValidation');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var _React$PropTypes = _react2.default.PropTypes,
    func = _React$PropTypes.func,
    object = _React$PropTypes.object,
    bool = _React$PropTypes.bool;


var Signup = _react2.default.createClass({
  displayName: 'Signup',

  propTypes: {
    dispatchUserSignupRequest: func.isRequired,
    dispatchAddFlashMessage: func.isRequired,
    dispatchDupeUserCheck: func.isRequired,
    dispatchNewFormErrors: func.isRequired,
    dispatchSignupLoading: func.isRequired,
    errors: object,
    signupLoading: bool.isRequired,
    user: object,
    invalid: bool
  },

  getInitialState: function getInitialState() {
    return {
      username: '',
      email: '',
      password: '',
      passwordConfirmation: '',
      invalid: false
    };
  },
  onChange: function onChange(event) {
    this.setState(_defineProperty({}, event.target.name, event.target.value));
  },
  isValid: function isValid() {
    var _validateInput = (0, _signupValidation2.default)(this.state),
        errors = _validateInput.errors,
        isValid = _validateInput.isValid;

    if (!isValid) {
      this.props.dispatchNewFormErrors(this.props.errors, errors);
    }
    return isValid;
  },
  checkIfUserExists: function checkIfUserExists(event) {
    var field = event.target.name;
    var val = event.target.value;
    if (val !== '' && val !== this.props.errors.username) {
      this.props.dispatchDupeUserCheck(val, field, this.props.errors);
    }
    if (val === '') {
      this.props.dispatchNewFormErrors(this.props.errors, _defineProperty({}, field, 'A valid ' + [field] + ' is required'));
    }
  },
  ensurePasswordsMatch: function ensurePasswordsMatch(event) {
    if (this.state.password !== this.state.passwordConfirmation) {
      return this.props.dispatchNewFormErrors(this.props.errors, {
        passwordConfirmation: 'passwords don\'t match'
      });
    }
    if (this.props.errors.passwordConfirmation) {
      return this.props.dispatchNewFormErrors(this.props.errors, {
        password: null,
        passwordConfirmation: null
      });
    }
    return;
  },
  onSubmit: function onSubmit(event) {
    event.preventDefault();

    if (this.isValid()) {
      this.props.dispatchNewFormErrors(this.props.errors, {});
      this.props.dispatchUserSignupRequest(this.state);
      // TODO: set isLoading to false from Redux. May need
      // to transfer loading state to redux.
    }
  },
  componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
    if (nextProps.user.isAuthenticated) {
      this.context.router.push('/');
    }
  },
  render: function render() {
    // TODO validate username to ensure it's not an email
    var errors = this.props.errors;

    return _react2.default.createElement(
      'div',
      { className: 'row' },
      _react2.default.createElement(
        'h1',
        { className: 'text-center' },
        'Sign up to make some polls!'
      ),
      _react2.default.createElement(
        'div',
        { className: 'col-md-4 col-md-offset-4' },
        _react2.default.createElement(
          'form',
          { onSubmit: this.onSubmit },
          _react2.default.createElement(_TextFieldGroup2.default, {
            value: this.state.username,
            onChange: this.onChange,
            onBlur: this.checkIfUserExists,
            type: 'text',
            field: 'username',
            label: 'Username',
            error: errors.username
          }),
          _react2.default.createElement(_TextFieldGroup2.default, {
            value: this.state.email,
            onChange: this.onChange,
            onBlur: this.checkIfUserExists,
            type: 'text',
            field: 'email',
            label: 'Email',
            error: errors.email
          }),
          _react2.default.createElement(_TextFieldGroup2.default, {
            value: this.state.password,
            onChange: this.onChange,
            type: 'password',
            field: 'password',
            label: 'Password',
            error: errors.password
          }),
          _react2.default.createElement(_TextFieldGroup2.default, {
            value: this.state.passwordConfirmation,
            onChange: this.onChange,
            onBlur: this.ensurePasswordsMatch,
            type: 'password',
            field: 'passwordConfirmation',
            label: 'Confirm Password',
            error: errors.passwordConfirmation
          }),
          _react2.default.createElement(
            'div',
            { className: 'form-group' },
            _react2.default.createElement(
              'button',
              { disabled: this.props.signupLoading || this.state.invalid || this.props.invalid, className: 'btn btn-primary btn-lg' },
              'Sign up'
            )
          )
        )
      )
    );
  }
});

Signup.contextTypes = {
  router: object.isRequired
};

var mapStateToProps = function mapStateToProps(state) {
  return {
    user: state.user,
    errors: {
      username: state.clientFormValidation.errors.username,
      email: state.clientFormValidation.errors.email,
      password: state.clientFormValidation.errors.password,
      passwordConfirmation: state.clientFormValidation.errors.passwordConfirmation
    },
    invalid: state.clientFormValidation.invalid,
    signupLoading: state.userSignupRequest.signupLoading
  };
};

var mapDispatchToProps = function mapDispatchToProps(dispatch) {
  return {
    dispatchUserSignupRequest: function dispatchUserSignupRequest(state) {
      dispatch((0, _userSignupRequest.signupRequest)(state));
    },
    dispatchAddFlashMessage: function dispatchAddFlashMessage(messageObj) {
      dispatch((0, _flashMessage.addFlashMessage)(messageObj));
    },
    dispatchDupeUserCheck: function dispatchDupeUserCheck(val, field, validationErrors) {
      dispatch((0, _clientFormValidation.dupeUserCheck)(val, field, validationErrors));
    },
    dispatchNewFormErrors: function dispatchNewFormErrors(currentErrors, newErrors) {
      dispatch((0, _clientFormValidation.newFormErrors)(currentErrors, newErrors));
    },
    dispatchSignupLoading: function dispatchSignupLoading(bool) {
      dispatch((0, _userSignupRequest.signupLoading)(bool));
    }
  };
};

exports.default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(Signup);