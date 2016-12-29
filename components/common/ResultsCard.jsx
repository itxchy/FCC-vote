const React = require('react')
const { connector } = require('../../redux/Store')
const { string, array, number, object, func } = React.PropTypes
const D3Chart = require('./D3Chart')
const isEmpty = require('lodash/isEmpty')

const ResultsCard = React.createClass({
  propTypes: {
    title: string,
    options: array,
    totalVotes: number,
    id: string,
    user: object
  },
  render () {
    let d3Component = null
    if (!isEmpty(this.props.options)) {
      d3Component = <D3Chart results={this.props.options} pollId={this.props.id} />
    }
    return (
      <div className='col-sm-4'>
        <h2>{this.props.title}</h2>
        <div className='col-sm-10'>
          <div className='row'>
            {d3Component ? d3Component : 'loading results...'}
          </div>
          <div className='row'>
            <p>Total votes: {this.props.totalVotes}</p>
          </div>
        </div>
      </div>
    )
  }
})

module.exports = connector(ResultsCard)