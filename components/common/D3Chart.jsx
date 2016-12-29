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
    console.log('results:', this.props.results)

    d3.select(chart)
      .selectAll('p')
      .data(this.props.results)
      .enter()
      .append('p')
      .text(d => {
        console.log('d', d)
        return d.option + ' ' + d.votes.length
      })

    console.log('faux element:', chart)
    return chart.toReact()
  }
})

module.exports = D3Chart
