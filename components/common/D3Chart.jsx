import React from 'react'
const { string, array } = React.PropTypes
import * as d3 from 'd3'
import ReactFauxDom from 'react-faux-dom'

const D3Chart = React.createClass({
  propTypes: {
    results: array,
    pollId: string
  },
  render () {
    let chart = ReactFauxDom.createElement('div')
    // console.log('data:', this.props.results)
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
      .attr('fill', 'teal')

    svg.selectAll('text')
      .data(data)
      .enter()
      .append('text')
      .text(d => d.option + ': ' + d.votes.length)
      .attr('x', 16)
      .attr('y', (d, i) => i * (height / data.length) + 24)
      .attr('width', d => d.votes.length * 4)
      .attr('height', d => height / data.length - 8)
      .attr('font-family', 'sans-serif')
      .attr('font-size', 18)

    // console.log('faux element:', chart)
    return chart.toReact()
  }
})

export default D3Chart
