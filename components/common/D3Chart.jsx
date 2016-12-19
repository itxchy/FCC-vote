const React = require('react')
const { object } = React.PropTypes

const D3Chart = React.createClass({
  propTypes: {
    results: object
  },
  render () {
    return (
      <div className='results-chart' ref='d3Mount' />    
    )
  }
})

module.exports = D3Chart
