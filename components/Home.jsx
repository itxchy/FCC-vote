import React from 'react'
import { connect } from 'react-redux'
import DisplayPolls from './common/DisplayPolls'
import { getAllPolls } from '../redux/modules/getAllPolls'
import { submitVote, resetUpdatedPollResults } from '../redux/modules/submitVote'
import { resetDeletedPoll } from '../redux/modules/deletePoll'
const { func, object, array, string, bool } = React.PropTypes

const Home = React.createClass({
  propTypes: {
    dispatchGetAllPolls: func,
    dispatchSubmitVote: func,
    dispatchResetUpdatedPollResults: func,
    dispatchResetDeletedPoll: func,
    deletedPoll: string,
    user: object,
    isAuthenticated: bool,
    clientIp: string,
    allPolls: array,
    updatedPollResults: object
  },
  componentWillReceiveProps (nextProps) {
    // after a vote is submitted, show the results
    if (nextProps.updatedPollResults !== null) {
      this.props.dispatchGetAllPolls()
      this.props.dispatchResetUpdatedPollResults()
    }
    if (nextProps.deletedPoll !== null) {
      this.props.dispatchGetAllPolls()
      this.props.dispatchResetDeletedPoll()
    }
  },
  render () {
    return (
      <div>
        <h1 className='view-title text-center'>Latest Polls</h1>
        <div className='row'>
          <DisplayPolls
            polls={this.props.allPolls}
            clientIp={this.props.clientIp}
            user={this.props.user}
            isAuthenticated={this.props.isAuthenticated}
            dispatchSubmitVote={this.props.dispatchSubmitVote}
            getPolls={this.props.dispatchGetAllPolls}
          />
        </div>
      </div>
    )
  }
})

const mapStateToProps = (state) => {
  return {
    user: state.user.user,
    isAuthenticated: state.user.isAuthenticated,
    clientIp: state.user.clientIp,
    allPolls: state.allPolls.allPolls,
    updatedPollResults: state.newVote.updatedResults,
    deletedPoll: state.deletedPoll.deletedPoll
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    dispatchGetAllPolls () {
      dispatch(getAllPolls())
    },
    dispatchSubmitVote (id, vote) {
      dispatch(submitVote(id, vote))
    },
    dispatchResetUpdatedPollResults () {
      dispatch(resetUpdatedPollResults())
    },
    dispatchResetDeletedPoll () {
      dispatch(resetDeletedPoll())
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)
