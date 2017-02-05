import React from 'react'
const { string, array, number } = React.PropTypes
import * as d3 from 'd3'

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
  winningOption () {
    let winningOptionIndex = null
    let possibleTieOptionIndexArray = []

    // determine winning option, or tie options
    this.props.results.reduce((prevTotal, option, index) => {
      if (option.votes.length > prevTotal) {
        winningOptionIndex = index
        possibleTieOptionIndexArray = []
        return option.votes.length
      }
      if (option.votes.length === prevTotal) {
        possibleTieOptionIndexArray.push(index)
      }
      return prevTotal
    }, 0)

    // in the case of a tie, return tied options
    if (possibleTieOptionIndexArray.length >= 1) {
      let tiedOptionObjects = possibleTieOptionIndexArray.map(tiedOptionIndex => {
        return this.props.results[tiedOptionIndex]
      })
      tiedOptionObjects.push(this.props.results[winningOptionIndex])
      this.setState({ tie: true, tiedOptionObjects })
      // return winningOption as false since there is a tie
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
    const reactThis = this

    var insertLinebreaks = function (d) {
      let optionResults = () => {
        if (winningOption && winningOption[0].option === d.option) {
          return `${d.option} — ${Math.round((d.votes.length / reactThis.props.totalVotes) * 100)}% ✓`
        }
        if (reactThis.state.tie) {
          let optionsMatch = tiedOptionStrings.filter(optionString => {
            return optionString === d.option
          })
          if (optionsMatch.length > 0) {
            return `${d.option} — ${Math.round((d.votes.length / reactThis.props.totalVotes) * 100)}% TIED`
          }
        }
        return `${d.option} — ${Math.round((d.votes.length / reactThis.props.totalVotes) * 100)}%`
      }
      console.log('optionResults', optionResults())
      let width = 32
      let text = d3.select(this)
      console.log('text', text)
      let words = optionResults().split(/\s+/).reverse(),
          word,
          line = [],
          lineNumber = 0,
          lineHeight = 1.1 // ems
          let y = text.attr("y")
          let dy = .3 // parseFloat(text.attr("dy")),
          let x = '.8em'
          let tspan = text.text(null).append("tspan").attr("x", x).attr("y", y).attr("dy", dy + "em");
          const tspanCharLength = d.option.split('').length
          // console.log('tspan char length', tspanCharLength)
          // console.log('y', text.attr('y'))
          console.log('words', words)
      while (word = words.pop()) {
        // console.log('tspan', tspan)
        // console.log('tspan.node()', tspan.node())
        line.push(word);
        let lineLength = line.join(' ').split('').length
        console.log('lineLength', lineLength, word)
        tspan.text(line.join(" "));
        if (lineLength > width) {
          line.pop();
          tspan.text(line.join(" "));
          line = [word];
          tspan = text.append("tspan").attr("x", x).attr("y", y).attr("dy", ++lineNumber * lineHeight + dy + "em").text(word);
        }
      }
    }
       
    // console.log('d3 object', d3)

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
