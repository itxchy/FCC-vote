const React = require('react')
const { string, array } = React.PropTypes
const d3 = require('d3')
const ReactFauxDom = require('react-faux-dom')

const D3Chart = React.createClass({
  propTypes: {
    results: array,
    pollId: string
  },
  render () {
    let chart = ReactFauxDom.createElement('div')
    console.log('data:', this.props.results)
    console.log('data.length:', this.props.results.length)
    // d3.select(chart)
    //   .selectAll('p')
    //   .data(this.props.results)
    //   .enter()
    //   .append('p')
    //   .text(d => {
    //     console.log('d', d)
    //     return d.option + ' ' + d.votes.length
    //   })
    let data = this.props.results
    var width = 200
    var height = 500

    var svg = d3.select(chart)
      .append('svg')
      .attr('width', width)
      .attr('height', height)

    svg.selectAll('rect')
      .data(data)
      .enter()
      .append('rect')
      .attr('x', 10)
      .attr('y', (d, i) => i * (height/data.length))
      .attr('width', d => d.votes.length * 4)
      .attr('height', d => height/data.length - 8)
      .attr('fill', 'teal')

    // svg.selectAll('text')
    //   .data(this.props.results)
    //   .enter()
    //   .append('text')
    //   .text(d => d.option + ': ' + d.votes)
    //   .attr('x', 16)
    //   .attr('y', (d,i) => i * (height/data.length) + 24)
    //   .attr('width', d => d.votes * 4)
    //   .attr('height', d => height/data.length - 8)
    //   .attr("font-family", "sans-serif")
    //   .attr("font-size", 18)

    console.log('faux element:', chart)
    return chart.toReact()
  }
})

module.exports = D3Chart
