'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRouter = require('react-router');

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _OwnerControlButtons = require('./OwnerControlButtons');

var _OwnerControlButtons2 = _interopRequireDefault(_OwnerControlButtons);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _React$PropTypes = _react2.default.PropTypes,
    string = _React$PropTypes.string,
    array = _React$PropTypes.array,
    number = _React$PropTypes.number,
    object = _React$PropTypes.object,
    func = _React$PropTypes.func,
    bool = _React$PropTypes.bool;


var PollCard = _react2.default.createClass({
  displayName: 'PollCard',

  propTypes: {
    title: string,
    options: array,
    totalVotes: number,
    id: string,
    user: object,
    dispatchSubmitVote: func.isRequired,
    singlePoll: bool,
    owner: string
  },
  getInitialState: function getInitialState() {
    return {
      selectedOption: null,
      updatedTotalVotes: null,
      noOptionSelected: false
    };
  },
  onOptionChange: function onOptionChange(event) {
    this.setState({
      selectedOption: event.target.value,
      noOptionSelected: false
    });
  },
  onVoteSubmit: function onVoteSubmit(event) {
    event.preventDefault();
    var pollID = this.props.id;
    var selectedOption = this.state.selectedOption;
    var voter = null;
    if (this.props.user) {
      voter = this.props.user.username || null;
    }
    if (selectedOption !== null) {
      var vote = { selectedOption: selectedOption, voter: voter };
      this.props.dispatchSubmitVote(pollID, vote);
    } else {
      this.setState({ noOptionSelected: true });
    }
  },
  render: function render() {
    var _this = this;

    var options = this.props.options.map(function (option, index) {
      var id = 'gridRadios' + index;
      var value = '' + index;
      return _react2.default.createElement(
        'div',
        { key: option.option, className: 'form-check' },
        _react2.default.createElement(
          'label',
          { className: 'form-check-label poll-card-label' },
          _react2.default.createElement('input', {
            className: 'form-check-input radio-option',
            type: 'radio',
            onChange: _this.onOptionChange,
            name: 'gridRadios',
            id: id,
            value: value
          }),
          option.option
        )
      );
    });
    var noOptionSelectedError = _react2.default.createElement(
      'div',
      { className: 'row none-selected-error' },
      _react2.default.createElement('i', { className: 'fa fa-exclamation-triangle', 'aria-hidden': 'true' }),
      ' Select an option before submitting'
    );
    return _react2.default.createElement(
      'div',
      { className: (0, _classnames2.default)('card', { 'center-div-horizontally': this.props.singlePoll }) },
      _react2.default.createElement(
        'form',
        { className: 'col-md-10 poll-form', onSubmit: this.onVoteSubmit },
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
          results: false
        }),
        _react2.default.createElement(
          'fieldset',
          { className: 'form-group row' },
          _react2.default.createElement(
            'div',
            { className: 'col-md-10' },
            options
          )
        ),
        _react2.default.createElement(
          'p',
          { className: 'poll-tally-owner-display total-votes-tally' },
          'Total Votes: ',
          this.state.updatedTotalVotes || this.props.totalVotes
        ),
        _react2.default.createElement(
          'p',
          { className: 'poll-tally-owner-display' },
          'Poll Owner: ',
          this.props.owner
        ),
        _react2.default.createElement(
          'div',
          { className: 'form-group row' },
          _react2.default.createElement(
            'div',
            { className: 'offset-sm-2 col-sm-10' },
            this.state.noOptionSelected ? noOptionSelectedError : null,
            _react2.default.createElement(
              'button',
              { type: 'submit', className: 'btn btn-primary' },
              'Vote'
            )
          )
        )
      )
    );
  }
});

exports.default = PollCard;