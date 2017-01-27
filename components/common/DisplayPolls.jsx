import React from 'react'
import ResultsCard from './ResultsCard'
import PollCard from './PollCard'
import EmptyPolls from './EmptyPolls'
import { dupeVoterCheck } from '../../routes/lib/pollsLib'
import isEmpty from 'lodash/isEmpty'
import has from 'lodash/has'
const { func, array, object, bool, string } = React.PropTypes

const DisplayPolls = React.createClass({
  propTypes: {
    polls: array,
    user: object,
    clientIp: string,
    isAuthenticated: bool,
    dispatchSubmitVote: func,
    getPolls: func
  },
  populateCards () {
    const singlePoll = this.props.polls.length === 1
    return this.props.polls.map(poll => {
      // const currentUser = this.props.user ? this.props.user.username : null
      const currentUser = this.props.isAuthenticated && this.props.user
        ? this.props.user.username
        : this.props.clientIp
      console.log('DisplayPolls.jsx: currentUser', currentUser)
      const dupeVoter = dupeVoterCheck(poll, currentUser)
      const { title, options, totalVotes, _id, owner } = poll
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
            owner={owner}
          />
        )
      }
      return (
        <PollCard
          singlePoll={singlePoll}
          dispatchSubmitVote={this.props.dispatchSubmitVote}
          user={this.props.user}
          key={_id}
          title={title}
          options={options}
          totalVotes={totalVotes}
          id={_id}
          owner={owner}
        />
      )
    })
  },
  componentWillMount () {
    this.props.getPolls()
  },
  render () {
    // if the polls haven't loaded yet, show a loading dialog
    if (!this.props.polls || isEmpty(this.props.polls || this.props.isAuthenticated === null)) {
      return <EmptyPolls polls={this.props.polls} />
    }
    // if no polls are returned, tell the user they have no polls
    if (has(this.props.polls[0], 'polls') && this.props.polls[0].polls === null) {
      return <EmptyPolls polls={false} />
    }
    const populatedCards = this.populateCards()
    return (
      <div className='container'>
        {populatedCards}
      </div>
    )
  }
})

export default DisplayPolls
