import React from 'react'
const { string, func, array, object, bool } = React.PropTypes
import validateCreateAPollInput from '../../routes/shared/createAPollValidation'

const SaveOrReset = React.createClass({
  propTypes: {
    newPollTitle: string,
    newPollOptions: array,
    dispatchResetNewPoll: func,
    dispatchSubmitPoll: func.isRequired,
    user: object.isRequired,
    poll: object,
    newPoll: bool.isRequired,
    pollID: string
  },
  getInitialState () {
    return {
      errors: {}
    }
  },
  isValid () {
    const inputData = {
      newPollTitle: this.props.newPollTitle,
      newPollOptions: this.props.newPollOptions
    }
    const { errors, isValid } = validateCreateAPollInput(inputData)
    if (!isValid) {
      this.setState({ errors: errors })
    }
    return isValid
  },
  saveButtonHandler () {
    if (this.isValid()) {
      const newPoll = {
        title: this.props.newPollTitle,
        options: this.props.newPollOptions,
        owner: this.props.user.user.username
      }
      this.props.newPoll
        ? this.props.dispatchSubmitPoll(newPoll)
        : this.props.dispatchSubmitPoll(this.props.pollID, newPoll)
    }
  },
  resetButtonHandler () {
    this.props.dispatchResetNewPoll()
  },
  render () {
    // TODO: move this error to redux to allow this dialog to be cleared when focusing on the blank option
    const blankOptionError = (
      <div className='row two-or-more-error'>
        <i className='fa fa-exclamation-triangle' aria-hidden='true' /> Blank options are not allowed
      </div>
    )
    return (
      <div className='text-center'>
        {this.state.errors.newPollOptions ? blankOptionError : null}
        <button
          className='btn btn-primary save-reset-buttons'
          onClick={this.saveButtonHandler}
        >
          Submit
        </button>
        <button
          className='btn save-reset-buttons reset-poll-button'
          onClick={this.resetButtonHandler}
        >
          Reset
        </button>
      </div>
    )
  }
})

export default SaveOrReset
