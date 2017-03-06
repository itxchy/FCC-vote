import React from 'react'
import NewPollTitle from './NewPollTitle'
import PendingPollOptions from './PendingPollOptions'
import SaveOrReset from './SaveOrReset'
import { connect } from 'react-redux'
import {
  updateOption,
  setNewPollTitle,
  setTitleEditable,
  submitNewPoll,
  resetNewPoll,
  resetPollSaved
} from '../../redux/modules/createNewPoll'
const { object, func, string, bool, array } = React.PropTypes

const CreateAPoll = React.createClass({
  propTypes: {
    poll: object,
    dispatchUpdateOption: func.isRequired,
    newPollTitle: string,
    titleEditable: bool,
    dispatchSetNewPollTitle: func.isRequired,
    dispatchSetTitleEditable: func.isRequired,
    newPollOptions: array,
    dispatchSubmitPoll: func.isRequired,
    dispatchResetNewPoll: func.isRequired,
    dispatchResetPollSaved: func.isRequired,
    pollSaved: string,
    user: object
  },
  componentWillReceiveProps (nextProps) {
    if (nextProps.pollSaved) {
      this.context.router.push(`/v/${nextProps.pollSaved}`)
      this.props.dispatchResetPollSaved()
    }
  },
  render () {
    const newPoll = true
    return (
      <div>
        <h1 className='view-title text-center'>Create a New Poll</h1>
        <NewPollTitle
          newPollTitle={this.props.newPollTitle}
          titleEditable={this.props.titleEditable}
          dispatchSetNewPollTitle={this.props.dispatchSetNewPollTitle}
          dispatchSetTitleEditable={this.props.dispatchSetTitleEditable}
        />
        <PendingPollOptions
          poll={this.props.poll}
          dispatchUpdateOption={this.props.dispatchUpdateOption}
        />
        <SaveOrReset
          newPollTitle={this.props.newPollTitle}
          newPollOptions={this.props.newPollOptions}
          dispatchResetNewPoll={this.props.dispatchResetNewPoll}
          dispatchSubmitPoll={this.props.dispatchSubmitPoll}
          user={this.props.user}
          poll={this.props.poll}
          newPoll={newPoll}
          pollID={null}
        />
      </div>
    )
  }
})

CreateAPoll.contextTypes = {
  router: object.isRequired
}

const mapStateToProps = (state) => {
  return {
    poll: state.newPoll,
    newPollTitle: state.newPoll.newPollTitle,
    titleEditable: state.newPoll.titleEditable,
    newPollOptions: state.newPoll.newPollOptions,
    pollSaved: state.newPoll.pollSaved,
    user: state.user
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    dispatchUpdateOption (newOptions) {
      dispatch(updateOption(newOptions))
    },
    dispatchSetNewPollTitle (pollTitle) {
      dispatch(setNewPollTitle(pollTitle))
    },
    dispatchSetTitleEditable (bool) {
      dispatch(setTitleEditable(bool))
    },
    dispatchResetNewPoll (newPoll) {
      dispatch(resetNewPoll())
    },
    dispatchSubmitPoll (newPoll) {
      dispatch(submitNewPoll(newPoll))
    },
    dispatchResetPollSaved () {
      dispatch(resetPollSaved())
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateAPoll)
