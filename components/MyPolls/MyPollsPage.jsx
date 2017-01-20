import React from 'react'
import { connect } from 'react-redux'
import isEmpty from 'lodash/isEmpty'
import DisplayPolls from '../common/DisplayPolls'
const { func, object, array } = React.PropTypes
import { getUserPolls } from '../../redux/modules/getUserPolls'
import { submitVote, resetUpdatedPollResults } from '../../redux/modules/submitVote'

const MyPollsPage = React.createClass({
  propTypes: {
    dispatchGetUserPolls: func.isRequired,
    dispatchSubmitVote: func.isRequired,
    updatedPollResults: object,
    user: object.isRequired,
    userPolls: array
  },
  getUserPolls () {
    if (this.props.user.user) {
      const username = this.props.user.user.username
      if (username && isEmpty(this.props.userPolls)) {
        this.props.dispatchGetUserPolls(username)
      }
    }
  },
  componentWillReceiveProps (nextProps) {
    // If a new vote was accepted, the relevent poll card should be
    // flipped to a results card including the newest vote.
    // For now, all polls will be refreshed.
    if (nextProps.updatedPollResults !== null || nextProps.user !== this.props.user) {
      this.props.dispatchGetUserPolls()
      this.props.dispatchResetUpdatedPollResults()
    }
  },
  render () {
    // this.getUserPolls()
    const polls = this.props.userPolls ? this.props.userPolls : null
    // empty = { polls: null }
    return (
      <div>
        <DisplayPolls
          polls={polls}
          user={this.props.user}
          dispatchSubmitVote={this.props.dispatchSubmitVote}
          getPolls={this.getUserPolls}
        />
      </div>
    )
  }
})

const mapStateToProps = (state) => {
  return {
    user: state.user,
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
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MyPollsPage)
