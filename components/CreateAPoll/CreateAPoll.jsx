import React from 'react'
import NewPollTitle from './NewPollTitle'
import PendingPollOptions from './PendingPollOptions'
import SaveOrReset from './SaveOrReset'
import { connect } from 'react-redux'
import { updateOption } from '../../redux/modules/createNewPoll'
const { object, func } = React.PropTypes

const CreateAPoll = React.createClass({
  propTypes: {
    poll: object,
    dispatchUpdateOption: func
  },
  render () {
    return (
      <div>
        <h1 className='view-title text-center'>Create a New Poll</h1>
        <NewPollTitle />
        <PendingPollOptions
          poll={this.props.poll}
          dispatchUpdateOptions={this.props.dispatchUpdateOption}
        />
        <SaveOrReset />
      </div>
    )
  }
})

const mapStateToProps = (state) => {
  return {
    poll: state.newPoll
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    dispatchUpdateOption (newOptions) {
      dispatch(updateOption(newOptions))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateAPoll)
