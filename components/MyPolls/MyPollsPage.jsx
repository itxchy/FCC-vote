import React from 'react'
import { connect } from 'react-redux'
import DisplayPolls from '../common/DisplayPolls'
const { func, object, array, bool, string } = React.PropTypes
import { getUserPolls, clearUserPolls } from '../../redux/modules/getUserPolls'
import { submitVote, resetUpdatedPollResults } from '../../redux/modules/submitVote'

const MyPollsPage = React.createClass({
  propTypes: {
    dispatchGetUserPolls: func.isRequired,
    dispatchSubmitVote: func.isRequired,
    dispatchResetUpdatedPollResults: func.isRequired,
    dispatchClearUserPolls: func.isRequired,
    clientIp: string,
    isAuthenticated: bool,
    updatedPollResults: object,
    user: object.isRequired,
    userPolls: array
  },
  getUserPolls () {
    if (this.props.user) {
      const username = this.props.user.username
      if (username) {
        this.props.dispatchGetUserPolls(username)
      }
    }
  },
  componentWillReceiveProps (nextProps) {
    // If a new vote was accepted, the relevent poll card should be
    // flipped to a results card including the newest vote.
    if (nextProps.updatedPollResults !== null || nextProps.user !== this.props.user) {
      this.getUserPolls()
      this.props.dispatchResetUpdatedPollResults()
    }
    if (nextProps.isAuthenticated === false) {
      this.context.router.push('/')
    }
  },
  componentWillUnmount () {
    this.props.dispatchClearUserPolls()
  },
  render () {
    console.log('MyPollsPage this.props.user', this.props.user)
    console.log('MyPollsPage this.props.userPolls', this.props.userPolls)
    const polls = this.props.userPolls ? this.props.userPolls : null
    return (
      <div>
        <DisplayPolls
          polls={polls}
          clientIp={this.props.clientIp}
          user={this.props.user}
          isAuthenticated={this.props.isAuthenticated}
          dispatchSubmitVote={this.props.dispatchSubmitVote}
          getPolls={this.getUserPolls}
        />
      </div>
    )
  }
})

MyPollsPage.contextTypes = {
  router: object.isRequired
}

const mapStateToProps = (state) => {
  return {
    user: state.user.user,
    isAuthenticated: state.user.isAuthenticated,
    clientIp: state.user.clientIp,
    userPolls: state.userPolls.userPolls,
    updatedPollResults: state.newVote.updatedResults
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    dispatchGetUserPolls (username) {
      dispatch(getUserPolls(username))
    },
    dispatchSubmitVote (id, vote) {
      dispatch(submitVote(id, vote))
    },
    dispatchResetUpdatedPollResults () {
      dispatch(resetUpdatedPollResults())
    },
    dispatchClearUserPolls () {
      dispatch(clearUserPolls())
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MyPollsPage)
