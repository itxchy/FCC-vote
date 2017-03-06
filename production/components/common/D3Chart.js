'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _d = require('d3');

var d3 = _interopRequireWildcard(_d);

var _reactFauxDom = require('react-faux-dom');

var _reactFauxDom2 = _interopRequireDefault(_reactFauxDom);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _React$PropTypes = _react2.default.PropTypes,
    string = _React$PropTypes.string,
    array = _React$PropTypes.array,
    number = _React$PropTypes.number;


var D3Chart = _react2.default.createClass({
  displayName: 'D3Chart',

  propTypes: {
    results: array,
    pollId: string,
    totalVotes: number
  },
  getInitialState: function getInitialState() {
    return {
      tie: false,
      tiedOptionObjects: null,
      winningOption: null
    };
  },
  winningOption: function winningOption() {
    var _this = this;

    var winningOptionIndex = null;
    var possibleTieOptionIndexArray = [];

    // determine winning option, or tie options
    this.props.results.reduce(function (prevTotal, option, index) {
      if (option.votes.length === 0) {
        return prevTotal;
      }
      if (option.votes.length > prevTotal) {
        winningOptionIndex = index;
        possibleTieOptionIndexArray = [];
        return option.votes.length;
      }
      if (option.votes.length === prevTotal && option.votes.length !== 0) {
        possibleTieOptionIndexArray.push(index);
      }
      return prevTotal;
    }, 0);

    // in the case of a tie, return tied options
    if (possibleTieOptionIndexArray.length >= 1) {
      // TODO: ensure winningOptionIndex isn't larger than tied vote counts
      var tiedOptionObjects = possibleTieOptionIndexArray.map(function (tiedOptionIndex) {
        return _this.props.results[tiedOptionIndex];
      });
      tiedOptionObjects.push(this.props.results[winningOptionIndex]);
      this.setState({ tie: true, tiedOptionObjects: tiedOptionObjects });
      // return winningOption as false since there is a tie
      return false;
    }
    // return the winningOption since there is a winner
    this.setState({ winningOption: [this.props.results[winningOptionIndex]] });
    return [this.props.results[winningOptionIndex]];
  },
  createOptionResultsText: function createOptionResultsText(winningOption, tiedOptionStrings, d) {
    if (this.props.totalVotes === 0) {
      return d.option + ' \u2014 0%';
    }
    if (winningOption && winningOption[0] && winningOption[0].option === d.option) {
      return d.option + ' \u2014 ' + Math.round(d.votes.length / this.props.totalVotes * 100) + '% \u2713';
    }
    if (this.state.tie) {
      var optionsMatch = tiedOptionStrings.filter(function (optionString) {
        return optionString === d.option;
      });
      if (optionsMatch.length > 0) {
        return d.option + ' \u2014 ' + Math.round(d.votes.length / this.props.totalVotes * 100) + '% TIED';
      }
    }
    return d.option + ' \u2014 ' + Math.round(d.votes.length / this.props.totalVotes * 100) + '%';
  },
  componentWillMount: function componentWillMount() {
    this.winningOption();
  },
  render: function render() {
    var _this2 = this;

    var winningOption = this.state.winningOption;
    // if there is a tie, create an array of option strings to compare with what D3 recieves
    var tiedOptionStrings = null;
    if (this.state.tie) {
      tiedOptionStrings = this.state.tiedOptionObjects.map(function (optionObject) {
        return optionObject.option;
      });
    }
    var chart = _reactFauxDom2.default.createElement('div');
    var data = this.props.results;
    var width = 300;
    var height = 300;
    var reactThis = this;

    /**
     * Allows for textwrapping within SVG elements. Width represents the max number of charactors per line
     */
    var insertLinebreaks = function insertLinebreaks(d) {
      var optionResults = reactThis.createOptionResultsText(winningOption, tiedOptionStrings, d);
      var width = 32;
      var text = d3.select(this);
      var words = optionResults.split(/\s+/).reverse();
      var word = void 0;
      var wordPop = function wordPop() {
        return word = words.pop();
      }; // eslint-disable-line no-return-assign
      var line = [];
      var lineNumber = 0;
      var lineHeight = 1.1;
      var y = text.attr('y');
      var dy = 0.3;
      var x = '.8em';
      var tspan = text.text(null).append('tspan').attr('x', x).attr('y', y).attr('dy', dy + 'em');
      while (wordPop()) {
        line.push(word);
        var lineLength = line.join(' ').split('').length;
        tspan.text(line.join(' '));
        if (lineLength > width) {
          line.pop();
          tspan.text(line.join(' '));
          line = [word];
          tspan = text.append('tspan').attr('x', x).attr('y', y).attr('dy', ++lineNumber * lineHeight + dy + 'em').text(word);
        }
      }
    };

    var xScale = d3.scaleLinear().domain([0, d3.max(data, function (d) {
      return d.votes.length;
    })]).range([1, width]);

    var svg = d3.select(chart).append('svg').attr('width', width).attr('height', height);

    svg.selectAll('rect').data(data).enter().append('rect').attr('x', 10).attr('y', function (d, i) {
      return i * (height / data.length);
    }).attr('width', function (d) {
      return xScale(d.votes.length);
    }).attr('height', height / data.length - 4).attr('fill', function (d) {
      // if a winning option exists and it matches the current object,
      // return the winning color
      if (winningOption && winningOption[0] && winningOption[0].option === d.option) {
        return '#01FF70';
      }
      // if there is a tie, check if the current option matches any of the
      // tied options. If so, return the winning color
      if (_this2.state.tie) {
        var optionsMatch = tiedOptionStrings.filter(function (optionString) {
          return optionString === d.option;
        });
        if (optionsMatch.length > 0) {
          return '#01FF70';
        }
      }
      // otherwise, return the losing color
      return '#3D9970';
    });

    svg.selectAll('text').data(data).enter().append('text').text(function (d) {
      // if (this.props.totalVotes === 0) {
      //   return `${d.option} — 0%`
      // }
      // if (winningOption && winningOption[0] && winningOption[0].option === d.option) {
      //   return `${d.option} — ${Math.round((d.votes.length / this.props.totalVotes) * 100)}% ✓`
      // }
      // if (this.state.tie) {
      //   let optionsMatch = tiedOptionStrings.filter(optionString => {
      //     return optionString === d.option
      //   })
      //   if (optionsMatch.length > 0) {
      //     return `${d.option} — ${Math.round((d.votes.length / this.props.totalVotes) * 100)}% TIED`
      //   }
      // }
      // console.log('Shouldnt be 0', this.props.totalVotes)
      // return `${d.option} — ${Math.round((d.votes.length / this.props.totalVotes) * 100)}TT%`
    }).attr('x', 16).attr('y', function (d, i) {
      return i * (height / data.length) + 24;
    }).attr('width', function (d) {
      return d.votes.length * 4;
    }).attr('height', function (d) {
      return height / data.length - 8;
    }).classed('result-text', true);

    svg.selectAll('text').each(insertLinebreaks);

    return chart.toReact();
  }
});

exports.default = D3Chart;