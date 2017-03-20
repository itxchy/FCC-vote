import React from 'react'
import { Link } from 'react-router'
const { string, array, number, object, bool } = React.PropTypes
import OwnerControlButtons from './OwnerControlButtons'
import D3Chart from './D3Chart'
import isEmpty from 'lodash/isEmpty'
import classnames from 'classnames'

const ResultsCard = React.createClass({
  propTypes: {
    title: string,
    options: array,
    totalVotes: number,
    id: string,
    user: object,
    singlePoll: bool,
    owner: string.isRequired
  },
  render () {
    let d3Component = null
    if (typeof window !== 'undefined' && !isEmpty(this.props.options)) {
      d3Component = (
        <D3Chart
          results={this.props.options}
          pollId={this.props.id}
          totalVotes={this.props.totalVotes}
        />
      )
    }
    return (
      <div className={classnames('card', { 'center-div-horizontally': this.props.singlePoll })}>
        <div className='col-md-10'>
          <h2 className='row sm-text-algin-center'><Link to={`/v/${this.props.id}`}>{this.props.title}</Link></h2>
          <OwnerControlButtons
            id={this.props.id}
            owner={this.props.owner}
            user={this.props.user}
            results
          />
          <div className='row sm-text-algin-center'>
            {d3Component || 'loading results...'}
          </div>
          <div className='row'>
            <p className='poll-tally-owner-display total-votes-tally'>Total Votes: {this.props.totalVotes}</p>
            <p className='poll-tally-owner-display'>Poll Owner: {this.props.owner}</p>
          </div>
        </div>
      </div>
    )
  }
})

export default ResultsCard
