'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _React$PropTypes = _react2.default.PropTypes,
    string = _React$PropTypes.string,
    func = _React$PropTypes.func;


var TextFieldGroup = function TextFieldGroup(_ref) {
  var field = _ref.field,
      value = _ref.value,
      label = _ref.label,
      error = _ref.error,
      type = _ref.type,
      onChange = _ref.onChange,
      onBlur = _ref.onBlur;

  return _react2.default.createElement(
    'div',
    { className: (0, _classnames2.default)('form-group', { 'has-error': error }) },
    _react2.default.createElement(
      'label',
      { className: 'control-label' },
      label
    ),
    _react2.default.createElement('input', {
      value: value,
      onChange: onChange,
      onBlur: onBlur,
      type: type,
      name: field,
      className: 'form-control'
    }),
    error && _react2.default.createElement(
      'span',
      { className: 'help-block' },
      error
    )
  );
};

TextFieldGroup.propTypes = {
  field: string.isRequired,
  value: string.isRequired,
  label: string.isRequired,
  error: string,
  type: string.isRequired,
  onChange: func.isRequired,
  onBlur: func
};

TextFieldGroup.defaultProps = {
  type: 'text'
};

exports.default = TextFieldGroup;