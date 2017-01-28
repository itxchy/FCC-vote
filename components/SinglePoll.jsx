import React from 'react'
const { object, func, array, string, bool } = React.PropTypes
import { connect } from 'react-redux'
import { getSinglePoll, clearSinglePoll } from '../redux/modules/getSinglePoll'
import { submitVote } from '../redux/modules/submitVote'
import DisplayPolls from './common/DisplayPolls'

const SinglePoll = React.createClass({
  propTypes: {
    routeParams: object,
    singlePoll: array,
    user: object,
    clientIp: string,
    isAuthenticated: bool,
    dispatchGetSinglePoll: func,
    dispatchSubmitVote: func,
    dispatchClearSinglePoll: func
  },
  getPoll () {
    this.props.dispatchGetSinglePoll(this.props.routeParams.id)
  },
  componentWillMount () {
    this.getPoll()
  },
  componentWillUnmount () {
    this.props.dispatchClearSinglePoll()
  },
  render () {
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
        {this.props.singlePoll ? singlePoll : null}
      </div>
    )
  }
})

const mapStateToProps = (state) => {
  return {
    singlePoll: state.singlePoll.singlePoll,
    user: state.user.user,
    isAuthenticated: state.user.isAuthenticated,
    clientIp: state.user.clientIp
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
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SinglePoll)
