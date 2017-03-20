'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRouter = require('react-router');

var _OwnerControlButtons = require('./OwnerControlButtons');

var _OwnerControlButtons2 = _interopRequireDefault(_OwnerControlButtons);

var _D3Chart = require('./D3Chart');

var _D3Chart2 = _interopRequireDefault(_D3Chart);

var _isEmpty = require('lodash/isEmpty');

var _isEmpty2 = _interopRequireDefault(_isEmpty);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _React$PropTypes = _react2.default.PropTypes,
    string = _React$PropTypes.string,
    array = _React$PropTypes.array,
    number = _React$PropTypes.number,
    object = _React$PropTypes.object,
    bool = _React$PropTypes.bool;


var ResultsCard = _react2.default.createClass({
  displayName: 'ResultsCard',

  propTypes: {
    title: string,
    options: array,
    totalVotes: number,
    id: string,
    user: object,
    singlePoll: bool,
    owner: string.isRequired
  },
  render: function render() {
    var d3Component = null;
    if (typeof window !== 'undefined' && !(0, _isEmpty2.default)(this.props.options)) {
      d3Component = _react2.default.createElement(_D3Chart2.default, {
        results: this.props.options,
        pollId: this.props.id,
        totalVotes: this.props.totalVotes
      });
    }
    return _react2.default.createElement(
      'div',
      { className: (0, _classnames2.default)('card', { 'center-div-horizontally': this.props.singlePoll }) },
      _react2.default.createElement(
        'div',
        { className: '' },
        _react2.default.createElement(
          'h2',
          { className: 'row sm-text-algin-center' },
          _react2.default.createElement(
            _reactRouter.Link,
            { to: '/v/' + this.props.id },
            this.props.title
          )
        ),
        _react2.default.createElement(_OwnerControlButtons2.default, {
          id: this.props.id,
          owner: this.props.owner,
          user: this.props.user,
          results: true
        }),
        _react2.default.createElement(
          'div',
          { className: 'row sm-text-algin-center' },
          d3Component || 'loading results...'
        ),
        _react2.default.createElement(
          'div',
          { className: 'row' },
          _react2.default.createElement(
            'p',
            { className: 'poll-tally-owner-display total-votes-tally' },
            'Total Votes: ',
            this.props.totalVotes
          ),
          _react2.default.createElement(
            'p',
            { className: 'poll-tally-owner-display' },
            'Poll Owner: ',
            this.props.owner
          )
        )
      )
    );
  }
});

exports.default = ResultsCard;