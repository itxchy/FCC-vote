const React = require('react')
const { object } = React.PropTypes
const d3 = require('d3')

const D3Chart = React.createClass({
  propTypes: {
    results: object
  },
  componentDidMount() {
    const testText = d3.select('#test')
      .append('p')
      .text('This is only a test')
  },
  render () {
    return (
      <div className='results-chart' id='test' ref='d3Mount' />    
    )
  }
})

module.exports = D3Chart
