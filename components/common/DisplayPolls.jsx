import React from 'react'
import ResultsCard from './ResultsCard'
import PollCard from './PollCard'
import EmptyPolls from './EmptyPolls'
import { dupeVoterCheck } from '../../routes/lib/pollsLib'
import isEmpty from 'lodash/isEmpty'
import has from 'lodash/has'
import classnames from 'classnames'
const { func, array, object } = React.PropTypes

const DisplayPolls = React.createClass({
  propTypes: {
    polls: array,
    user: object,
    dispatchSubmitVote: func,
    getPolls: func
  },
  populateCards () {
    const singlePoll = this.props.polls.length === 1 ? true : false
    return this.props.polls.map(poll => {
      const currentUser = this.props.user ? this.props.user.username : null
      console.log('DisplayPolls currentUser', currentUser)
      const dupeVoter = dupeVoterCheck(poll, currentUser)
      console.log('dupeVoter result:', dupeVoter)
      const { title, options, totalVotes, _id } = poll
      if (dupeVoter) {
        return (
          <ResultsCard
            singlePoll={singlePoll}
            user={this.props.user}
            key={_id}
            title={title}
            options={options}
            totalVotes={totalVotes}
            id={_id}
          />
        )
      }
      return (
        <PollCard
          className={classnames({ 'center-div-horizontally': singlePoll })}
          dispatchSubmitVote={this.props.dispatchSubmitVote}
          user={this.props.user}
          key={_id}
          title={title}
          options={options}
          totalVotes={totalVotes}
          id={_id}
        />
      )
    })
  },
  componentWillMount () {
    this.props.getPolls()
  },
  render () {
    // if the polls haven't loaded yet, show a loading dialog
    if (!this.props.polls || isEmpty(this.props.polls)) {
      return <EmptyPolls polls={this.props.polls} />
    }
    // if no polls are returned, tell the user they have no polls
    if (has(this.props.polls[0], 'polls') && this.props.polls[0].polls === null) {
      console.log('returning EmptyPolls')
      return <EmptyPolls polls={false} />
    }
    const populatedCards = this.populateCards()
    return (
      <div>
        {populatedCards}
      </div>
    )
  }
})

export default DisplayPolls
