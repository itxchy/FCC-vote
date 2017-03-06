'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _LoadingSpinner = require('./LoadingSpinner');

var _LoadingSpinner2 = _interopRequireDefault(_LoadingSpinner);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var bool = _react2.default.PropTypes.bool;


var EmptyPolls = function EmptyPolls(_ref) {
  var polls = _ref.polls;

  if (polls === null) {
    return _react2.default.createElement(
      'div',
      { className: 'text-center' },
      _react2.default.createElement(_LoadingSpinner2.default, null)
    );
  }
  if (polls === false) {
    return _react2.default.createElement(
      'div',
      { className: 'text-center' },
      _react2.default.createElement(
        'h3',
        null,
        'No polls have been submitted yet :('
      ),
      _react2.default.createElement(
        'p',
        null,
        'Why not create one?'
      )
    );
  }
  return _react2.default.createElement(
    'div',
    { className: 'text-center' },
    _react2.default.createElement(
      'h3',
      null,
      'Something went wrong!'
    ),
    _react2.default.createElement(
      'p',
      null,
      'Polls should be showing up here, but alas... Life isn\'t perfect :('
    ),
    _react2.default.createElement(
      'p',
      null,
      'Please report this.'
    )
  );
};

EmptyPolls.propTypes = {
  polls: bool
};

exports.default = EmptyPolls;