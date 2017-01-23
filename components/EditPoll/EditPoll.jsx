import React from 'react'
import NewPollTitle from './NewPollTitle'
import PendingPollOptions from './PendingPollOptions'
import SaveOrReset from './SaveOrReset'
import { connect } from 'react-redux'
const { object } = React.PropTypes

const EditPoll = React.createClass({
  propTypes: {
    poll: object
  },
  render () {
    return (
      <div>
        <h1 className='view-title text-center'>Edit</h1>
        <NewPollTitle />
        <PendingPollOptions 
          poll={this.props.poll}
          dispatchUpdateOption={this.props.dispatchUpdateOption}
        />
        <SaveOrReset />
      </div>
    )
  }
})

const mapStateToProps = (state) => {
  return {
    poll: state.editPoll
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    dispatchUpdateOption (newOptions) {
      dispatch(setPollOptions(newOptions))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditPoll)