import React from 'react'
import { connect } from 'react-redux'
import DisplayPolls from './common/DisplayPolls'
import { getAllPolls } from '../redux/modules/getAllPolls'
import { submitVote, resetUpdatedPollResults } from '../redux/modules/submitVote'
const { func, object, array, string, bool } = React.PropTypes

const Home = React.createClass({
  propTypes: {
    dispatchGetAllPolls: func,
    dispatchSubmitVote: func,
    dispatchResetUpdatedPollResults: func,
    user: object,
    isAuthenticated: bool,
    clientIp: string,
    allPolls: array,
    updatedPollResults: object
  },
  componentWillReceiveProps (nextProps) {
    // If a new vote was accepted, the relevent poll card should be
    // flipped to a results card including the newest vote.
    // For now, all polls will be refreshed.
    if (nextProps.updatedPollResults !== null) {
      this.props.dispatchGetAllPolls()
      this.props.dispatchResetUpdatedPollResults()
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
    updatedPollResults: state.newVote.updatedResults
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
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)
