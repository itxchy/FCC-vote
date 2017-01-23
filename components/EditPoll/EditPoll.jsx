import React from 'react'
import NewPollTitle from './NewPollTitle'
import PendingPollOptions from './PendingPollOptions'
import SaveOrReset from './SaveOrReset'
import { connect } from 'react-redux'
import { setPollOptions } from '../../redux/modules/editPoll'
const { object, func } = React.PropTypes

const EditPoll = React.createClass({
  propTypes: {
    poll: object,
    dispatchUpdateOption: func
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
    poll: state.editPoll,
    newPollTitle: state.editPoll.newPollTitle,
    titleEditable: state.editPoll.titleEditable,
    newPollOptions: state.editPoll.newPollOptions,
    user: state.user
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