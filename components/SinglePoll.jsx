import React from 'react'
const { object, func, array, string, bool } = React.PropTypes
import { connect } from 'react-redux'
import { getSinglePoll, clearSinglePoll } from '../redux/modules/getSinglePoll'
import { resetDeletedPoll } from '../redux/modules/deletePoll'
import { submitVote, resetUpdatedPollResults } from '../redux/modules/submitVote'
import { clearAllFlashMessages } from '../redux/modules/flashMessage'
import DisplayPolls from './common/DisplayPolls'
import LoadingSpinner from './common/LoadingSpinner'

const SinglePoll = React.createClass({
  propTypes: {
    routeParams: object,
    singlePoll: array,
    user: object,
    clientIp: string,
    isAuthenticated: bool,
    dispatchGetSinglePoll: func,
    dispatchSubmitVote: func,
    dispatchClearSinglePoll: func,
    dispatchResetDeletedPoll: func,
    dispatchResetUpdatedPollResults: func,
    dispatchClearAllFlashMessages: func,
    updatedPollResults: object,
    deletedPoll: string,
    flashMessages: array
  },
  getPoll () {
    this.props.dispatchGetSinglePoll(this.props.routeParams.id)
  },
  componentWillMount () {
    this.props.dispatchClearSinglePoll()
    this.getPoll()
  },
  componentWillUnmount () {
    this.props.dispatchClearSinglePoll()
    if (this.props.flashMessages.length > 0) {
      this.props.dispatchClearAllFlashMessages()
    }
  },
  componentWillReceiveProps (nextProps) {
    if (nextProps.updatedPollResults !== null) {
      this.getPoll()
      this.props.dispatchResetUpdatedPollResults()
    }
    if (nextProps.deletedPoll !== null) {
      this.context.router.push('/')
      this.props.dispatchResetDeletedPoll()
    }
  },
  render () {
    const loading = <LoadingSpinner />
    const singlePoll = (
      <div className='center-div-horizontally'>
        <DisplayPolls
          polls={this.props.singlePoll}
          clientIp={this.props.clientIp}
          user={this.props.user}
          isAuthenticated={this.props.isAuthenticated}
          dispatchSubmitVote={this.props.dispatchSubmitVote}
          getPolls={this.getPoll}
        />
      </div>
    )
    return (
      <div className='center-div-horizontally'>
        {this.props.singlePoll ? singlePoll : loading}
      </div>
    )
  }
})

SinglePoll.contextTypes = {
  router: object.isRequired
}

const mapStateToProps = (state) => {
  return {
    singlePoll: state.singlePoll.singlePoll,
    user: state.user.user,
    isAuthenticated: state.user.isAuthenticated,
    clientIp: state.user.clientIp,
    updatedPollResults: state.newVote.updatedResults,
    deletedPoll: state.deletedPoll.deletedPoll,
    flashMessages: state.flashMessages.flashMessages
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    dispatchGetSinglePoll (id) {
      dispatch(getSinglePoll(id))
    },
    dispatchSubmitVote (id, vote) {
      dispatch(submitVote(id, vote))
    },
    dispatchClearSinglePoll () {
      dispatch(clearSinglePoll())
    },
    dispatchResetDeletedPoll () {
      dispatch(resetDeletedPoll())
    },
    dispatchResetUpdatedPollResults () {
      dispatch(resetUpdatedPollResults())
    },
    dispatchClearAllFlashMessages () {
      dispatch(clearAllFlashMessages())
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SinglePoll)
