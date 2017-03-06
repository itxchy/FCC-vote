'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRedux = require('react-redux');

var _deletePoll = require('../../redux/modules/deletePoll');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _React$PropTypes = _react2.default.PropTypes,
    string = _React$PropTypes.string,
    func = _React$PropTypes.func;


var DeleteModal = _react2.default.createClass({
  displayName: 'DeleteModal',

  propTypes: {
    id: string,
    dispatchDeletePoll: func
  },
  handleDeleteButtonClick: function handleDeleteButtonClick() {
    this.props.dispatchDeletePoll(this.props.id);
  },
  render: function render() {
    return _react2.default.createElement(
      'div',
      { className: 'modal fade', id: 'deleteModal-' + this.props.id, tabIndex: '-1', role: 'dialog', 'aria-labelledby': 'myModalLabel' },
      _react2.default.createElement(
        'div',
        { className: 'modal-dialog', role: 'document' },
        _react2.default.createElement(
          'div',
          { className: 'modal-content' },
          _react2.default.createElement(
            'div',
            { className: 'modal-header' },
            _react2.default.createElement(
              'button',
              { type: 'button', className: 'close', 'data-dismiss': 'modal', 'aria-label': 'Close' },
              _react2.default.createElement(
                'span',
                { 'aria-hidden': 'true' },
                '\xD7'
              )
            ),
            _react2.default.createElement(
              'h2',
              { className: 'modal-title', id: 'myModalLabel' },
              'Are you sure?'
            )
          ),
          _react2.default.createElement(
            'div',
            { className: 'modal-body' },
            _react2.default.createElement(
              'h4',
              null,
              'This poll and all of its data will be gone forever.'
            )
          ),
          _react2.default.createElement(
            'div',
            { className: 'modal-footer' },
            _react2.default.createElement(
              'button',
              { type: 'button', className: 'btn btn-default', 'data-dismiss': 'modal' },
              'Cancel'
            ),
            _react2.default.createElement(
              'button',
              {
                type: 'button',
                className: 'btn btn-danger',
                'data-dismiss': 'modal',
                onClick: this.handleDeleteButtonClick
              },
              'Delete'
            )
          )
        )
      )
    );
  }
});

var mapDispatchToProps = function mapDispatchToProps(dispatch) {
  return {
    dispatchDeletePoll: function dispatchDeletePoll(id) {
      dispatch((0, _deletePoll.deletePoll)(id));
    }
  };
};

exports.default = (0, _reactRedux.connect)(function (state) {
  return { user: state.user };
}, mapDispatchToProps)(DeleteModal);