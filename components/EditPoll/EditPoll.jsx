import React from 'react'
import NewPollTitle from '../CreateAPoll/NewPollTitle'
import PendingPollOptions from '../CreateAPoll/PendingPollOptions'
import SaveOrReset from '../CreateAPoll/SaveOrReset'
import { connect } from 'react-redux'
import {
  setPollOptions,
  setPollTitle,
  setTitleEditable,
  resetPoll,
  setEditedPoll,
  getPollData
} from '../../redux/modules/editPoll'
import { clearSinglePoll } from '../../redux/modules/getSinglePoll'
const { object, func, bool, string, array } = React.PropTypes

const EditPoll = React.createClass({
  propTypes: {
    poll: object,
    newPollTitle: string,
    newPollOptions: array,
    titleEditable: bool,
    dispatchUpdateOption: func,
    dispatchResetNewPoll: func,
    dispatchSubmitPoll: func,
    dispatchSetNewPollTitle: func,
    dispatchSetTitleEditable: func,
    dispatchGetPollData: func,
    dispatchClearSinglePoll: func,
    user: object,
    isAuthenticated: bool,
    routeParams: object.isRequired,
    editedPoll: object
  },
  componentWillMount () {
    this.props.dispatchGetPollData(this.props.routeParams.id)
  },
  componentWillUnmount () {
    this.props.dispatchResetNewPoll()
  },
  componentWillReceiveProps (nextProps) {
    if (nextProps.editedPoll !== null) {
      this.props.dispatchClearSinglePoll()
      this.context.router.push(`/v/${this.props.routeParams.id}`)
    }
    if (nextProps.isAuthenticated === false) {
      this.context.router.push('/')
    }
  },
  render () {
    const newPoll = false
    const fields = (
      <div>
        <h1 className='view-title text-center'>Editing...</h1>
        <NewPollTitle
          newPollTitle={this.props.newPollTitle}
          titleEditable={this.props.titleEditable}
          dispatchSetNewPollTitle={this.props.dispatchSetNewPollTitle}
          dispatchSetTitleEditable={this.props.dispatchSetTitleEditable}
          editPoll
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
          pollID={this.props.routeParams.id}
        />
        <div className='alert alert-warning edit-warning' role='alert'>
          <strong>Remember</strong>: Submitting an edit to this poll will erase all of its votes.
        </div>
      </div>
    )
    // if the title isn't an empty string, display fields. This prevents a text flash
    // after rerender. Hacky fix for now.
    const receivedTitle = this.props.newPollTitle !== ''
    return (
      <div>
        {receivedTitle ? fields : null}
      </div>
    )
  }
})

EditPoll.contextTypes = {
  router: object.isRequired
}

const mapStateToProps = (state) => {
  return {
    poll: state.editPoll,
    newPollTitle: state.editPoll.newPollTitle,
    newPollOptions: state.editPoll.newPollOptions,
    titleEditable: state.editPoll.titleEditable,
    user: state.user,
    isAuthenticated: state.user.isAuthenticated,
    editedPoll: state.editPoll.editedPoll
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    dispatchUpdateOption (newOptions) {
      dispatch(setPollOptions(newOptions))
    },
    dispatchSetNewPollTitle (pollTitle) {
      dispatch(setPollTitle(pollTitle))
    },
    dispatchSetTitleEditable (bool) {
      dispatch(setTitleEditable(bool))
    },
    dispatchResetNewPoll (newPoll) {
      dispatch(resetPoll())
    },
    dispatchSubmitPoll (id, pollData) {
      dispatch(setEditedPoll(id, pollData))
    },
    dispatchGetPollData (id) {
      dispatch(getPollData(id))
    },
    dispatchClearSinglePoll () {
      dispatch(clearSinglePoll())
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditPoll)
