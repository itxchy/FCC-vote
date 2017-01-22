import React from 'react'
const { object, func, array } = React.PropTypes
import { connect } from 'react-redux'
import { getSinglePoll } from '../redux/modules/getSinglePoll'
import { submitVote } from '../redux/modules/submitVote'
import DisplayPolls from './common/DisplayPolls'

const SinglePoll = React.createClass({
  propTypes: {
    routeParams: object,
    singlePoll: array,
    user: object,
    dispatchGetSinglePoll: func,
    dispatchSubmitVote: func
  },
  getPoll () {
    this.props.dispatchGetSinglePoll(this.props.routeParams.id)
  },
  componentWillMount () {
    this.getPoll()
  },
  render () {
    return (
      <div className='center-div-horizontally'>
        <h1 className='view-title text-center'>SinglePoll!</h1>
        <div className='center-div-horizontally'>
          <DisplayPolls
            polls={this.props.singlePoll}
            user={this.props.user}
            dispatchSubmitVote={this.props.dispatchSubmitVote}
            getPolls={this.getPoll}
          />
        </div>
      </div>
    )
  }
})

const mapStateToProps = (state) => {
  return {
    singlePoll: state.singlePoll.singlePoll,
    user: state.user.user
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    dispatchGetSinglePoll (id) {
      dispatch(getSinglePoll(id))
    },
    dispatchSubmitVote (id, vote) {
      dispatch(submitVote(id, vote))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SinglePoll)
