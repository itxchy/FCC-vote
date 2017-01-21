import React from 'react'
import { Link } from 'react-router'
const { string, array, number, object } = React.PropTypes
import D3Chart from './D3Chart'
import isEmpty from 'lodash/isEmpty'

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
      d3Component = (
        <D3Chart
          results={this.props.options}
          pollId={this.props.id}
          />
      )
    }
    return (
      <div className='col-sm-4'>
        <h2><Link to={`/v/${this.props.id}`}>{this.props.title}</Link></h2>
        <div className='col-sm-10'>
          <div className='row'>
            {d3Component || 'loading results...'}
          </div>
          <div className='row'>
            <p>Total votes: {this.props.totalVotes}</p>
          </div>
        </div>
      </div>
    )
  }
})

export default ResultsCard
