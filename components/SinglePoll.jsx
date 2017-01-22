import React from 'react'
const { object, func } = React.PropTypes
import { connect } from 'react-redux'
import { getSinglePoll } from '../redux/modules/getSinglePoll'

const SinglePoll = React.createClass({
  propTypes: {
    routeParams: object,
    singlePoll: object,
    dispatchGetSinglePoll: func
  },
  getPoll () {
    // TODO get individual poll object using poll id
    this.props.dispatchGetSinglePoll(this.props.routeParams.id)
  },
  componentWillMount () {
    this.getPoll()
  },
  render () {
    return (
      <div>
        <h1>SinglePoll!</h1>
      </div>
    )
  }
})

const mapStateToProps = (state) => {
  return {
    singlePoll: state.singlePoll
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    dispatchGetSinglePoll (id) {
      dispatch(getSinglePoll(id))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SinglePoll)
