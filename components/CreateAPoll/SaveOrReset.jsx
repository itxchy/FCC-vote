import React from 'react'
const { string, func, array, object } = React.PropTypes
import validateCreateAPollInput from '../../routes/shared/createAPollValidation'

const SaveOrReset = React.createClass({
  propTypes: {
    newPollTitle: string,
    newPollOptions: array,
    dispatchResetNewPoll: func,
    dispatchSubmitNewPoll: func.isRequired,
    user: object.isRequired
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
        owner: this.props.user.username
      }
      this.props.dispatchSubmitNewPoll(newPoll)
    }
  },
  resetButtonHandler () {
    this.props.dispatchResetNewPoll()
  },
  render () {
    return (
      <div className='text-center'>
        <button
          className='btn btn-primary save-reset-buttons'
          onClick={this.saveButtonHandler}
        >
          Save
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
