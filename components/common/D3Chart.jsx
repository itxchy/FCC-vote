import React from 'react'
const { string, array, number } = React.PropTypes

import ReactFauxDom from 'react-faux-dom'

const D3Chart = React.createClass({
  propTypes: {
    results: array,
    pollId: string,
    totalVotes: number
  },
  getInitialState () {
    return {
      tie: false,
      tiedOptionObjects: null,
      winningOption: null
    }
  },
  // mbostock's text wrap function: https://github.com/d3/d3/issues/1642
  wrap (text, width) {
    console.log('in wrap:', text, width)
    text.each(function () {
      let text = d3.select(this)
      console.log('text.text()', text.text())
      let words = text.text().split(/\s+/).reverse()
      let word
      let line = []
      let lineNumber = 0
      let lineHeight = 1.1 // ems
      let y = text.attr('y')
      let dy = parseFloat(text.attr('dy'))
      let tspan = text.text(null).append('tspan').attr('x', 0).attr('y', y).attr('dy', dy + 'em')
          console.log('d3 selected', text)
      while (word = words.pop()) {
        console.log('tspan', tspan.node())
        line.push(word)
        tspan.text(line.join(' '))
        if (tspan.node().getComputedTextLength() > width) {
          line.pop()
          tspan.text(line.join(' '))
          line = [word]
          tspan = text.append('tspan').attr('x', 0).attr('y', y).attr('dy', ++lineNumber * lineHeight + dy + 'em').text(word)
        }
      }
    })
  },
  winningOption () {
    let winningOptionIndex = null
    let possibleTieOptionIndexArray = []
    this.props.results.reduce((prevTotal, option, index) => {
      // prevTotal is an accumulator initiated as 0 in reduce's second argument

      // if the current option's vote count is more than the accumulator,
      // we have a clear winner! set winningOptionIndex as the current index
      // and clear out tieOptionIndexArray since we have a new uncontested winner.
      if (option.votes.length > prevTotal) {
        winningOptionIndex = index
        possibleTieOptionIndexArray = []
        return option.votes.length
      }

      // if current option's vote count equals the accumulator,
      // we have at least two tied winners (for now). push the current index to the
      // possibleTieOptionIndexArray
      if (option.votes.length === prevTotal) {
        possibleTieOptionIndexArray.push(index)
      }

      // unless there is a clear winner, pass the current accumulator forward
      return prevTotal
    }, 0)

    // if there are tied option indexes present, pass the tied option objects to state
    // as an array, including winningOptionIndex's option
    if (possibleTieOptionIndexArray.length >= 1) {
      let tiedOptionObjects = possibleTieOptionIndexArray.map(tiedOptionIndex => {
        return this.props.results[tiedOptionIndex]
      })
      tiedOptionObjects.push(this.props.results[winningOptionIndex])
      this.setState({ tie: true, tiedOptionObjects })
      // return winningOption as false. There is a tie
      return false
    }
    // return the winningOption since there is a winner
    this.setState({ winningOption: [this.props.results[winningOptionIndex]] })
    return [this.props.results[winningOptionIndex]]
  },
  componentWillMount () {
    this.winningOption()
  },
  render () {
    var insertLinebreaks = function (d) {
      // console.log('d', d)
      // console.log('d3.select(this)', d3.select(this))
      // var el = d3.select(this)
      // var words = d.option.split(' ');
      // el.text('');
      // for (var i = 0; i < words.length; i++) {
      //     var tspan = el.append('tspan').text(words[i]);
      //     if (i > 0)
      //         tspan.attr('x', 0).attr('dy', '15');
      // }
      let width = 200
      var text = d3.select(this),
          words = d.option.split(/\s+/).reverse(),
          word,
          line = [],
          lineNumber = 0,
          lineHeight = 1.1, // ems
          y = text.attr("y"),
          dy = parseFloat(text.attr("dy")),
          tspan = text.text(null).append("tspan").attr("x", 0).attr("y", y).attr("dy", dy + "em");
      while (word = words.pop()) {
        console.log('tspan', tspan)
        console.log('tspan.node()', tspan.node())
        line.push(word);
        tspan.text(line.join(" "));
        if (tspan.node().text.getComputedTextLength() > width) {
          line.pop();
          tspan.text(line.join(" "));
          line = [word];
          tspan = text.append("tspan").attr("x", 0).attr("y", y).attr("dy", ++lineNumber * lineHeight + dy + "em").text(word);
        }
      }
    }
       
    console.log('d3 object', d3)
    const winningOption = this.state.winningOption
    let tiedOptionStrings = null
    // if there is a tie, create an array of option strings to compare with what D3 recieves
    if (this.state.tie) {
      tiedOptionStrings = this.state.tiedOptionObjects.map(optionObject => {
        return optionObject.option
      })
    }
    let chart = ReactFauxDom.createElement('div')
    let data = this.props.results
    const width = 300
    const height = 300
    let xScale = d3.scaleLinear()
      .domain([0, d3.max(data, d => d.votes.length)])
      .range([1, width])

    let svg = d3.select(chart)
      .append('svg')
      .attr('width', width)
      .attr('height', height)

    svg.selectAll('rect')
      .data(data)
      .enter()
      .append('rect')
      .attr('x', 10)
      .attr('y', (d, i) => i * (height / data.length))
      .attr('width', d => xScale(d.votes.length))
      .attr('height', height / data.length - 4)
      .attr('fill', d => {
        // if a winning option exists and it matches the current object,
        // return the winning color
        if (winningOption && winningOption[0].option === d.option) {
          return '#01FF70'
        }
        // if there is a tie, check if the current option matches any of the
        // tied options. If so, return the winning color
        if (this.state.tie) {
          let optionsMatch = tiedOptionStrings.filter(optionString => {
            return optionString === d.option
          })
          if (optionsMatch.length > 0) {
            return '#01FF70'
          }
        }
        // otherwise, return the losing color
        return '#3D9970'
      })

    svg.selectAll('text')
      .data(data)
      .enter()
      .append('text')
      .text(d => {
        if (winningOption && winningOption[0].option === d.option) {
          return `${d.option} — ${Math.round((d.votes.length / this.props.totalVotes) * 100)}% ✓`
        }
        if (this.state.tie) {
          let optionsMatch = tiedOptionStrings.filter(optionString => {
            return optionString === d.option
          })
          if (optionsMatch.length > 0) {
            return `${d.option} — ${Math.round((d.votes.length / this.props.totalVotes) * 100)}% TIED`
          }
        }
        return `${d.option} — ${Math.round((d.votes.length / this.props.totalVotes) * 100)}%`
      })
      .attr('x', 16)
      .attr('y', (d, i) => i * (height / data.length) + 24)
      .attr('width', d => d.votes.length * 4)
      .attr('height', d => height / data.length - 8)
      .classed('result-text', true)

    svg.selectAll('text').each(insertLinebreaks)

    return chart.toReact()
  }
})

export default D3Chart
