import React from 'react'
import { connect } from 'react-redux'
import PollCard from './common/PollCard'
import ResultsCard from './common/ResultsCard'
import { getAllPolls } from '../redux/modules/getAllPolls'
import { submitVote } from '../redux/modules/submitVote'
const { func, object, array } = React.PropTypes
import { dupeVoterCheck } from '../routes/lib/pollsLib'
import isEmpty from 'lodash/isEmpty'

const Home = React.createClass({
  propTypes: {
    dispatchGetAllPolls: func,
    dispatchSubmitVote: func,
    user: object,
    allPolls: array,
    updatedPollResults: object
  },
  getRecentPolls () {
    if (this.props.allPolls === null) {
      this.props.dispatchGetAllPolls()
    }
  },
  populatedCards () {
    // console.log('all polls in populatedCards()', this.props.allPolls)
    return this.props.allPolls.map(poll => {
      // TODO: debug why certain voted polls don't show results initially
      // console.log('user object', this.props.user)
      // console.log('dupeVoterCheck args; poll:', poll, '\n this.props.user.username:', this.props.user.username)
      const dupeVoter = dupeVoterCheck(poll, this.props.user.username)
      const { title, options, totalVotes, _id } = poll
      if (dupeVoter) {
        return (
          <ResultsCard
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
  handleEmptyAllPollsObject () {
    this.getRecentPolls()
    if (this.props.allPolls === null) {
      return (
        <div className='text-center'>
          <h3>loading...</h3>
        </div>
      )
    }
    if (this.props.allPolls === false) {
      return (
        <div className='text-center'>
          <h3>No polls have been submitted yet :(</h3>
          <p>Why not create one?</p>
        </div>
      )
    }
    // console.log('this.props.allPolls', this.props.allPolls)
  },
  render () {
    this.getRecentPolls()
    let showPolls = null
    if (this.props.allPolls === null || isEmpty(this.props.allPolls)) {
      showPolls = this.handleEmptyAllPollsObject()
    } else {
      // console.log('this.props.allPolls inside render, should NOT be null', this.props.allPolls)
      showPolls = this.populatedCards()
    }
    return (
      <div>
        <h1 className='view-title text-center'>Latest Polls</h1>
        <div className='row'>
          {showPolls}
        </div>
      </div>
    )
  }
})

const mapStateToProps = (state) => {
  return {
    user: state.user.user,
    allPolls: state.allPolls.allPolls,
    updatedPollResults: state.results.updatedResults
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    dispatchGetAllPolls () {
      dispatch(getAllPolls())
    },
    dispatchSubmitVote (id, vote) {
      dispatch(submitVote(id, vote))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)
