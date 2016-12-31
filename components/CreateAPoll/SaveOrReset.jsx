import React from 'react'
import { connect } from 'react-redux'
const { string, func, array, object } = React.PropTypes
import validateCreateAPollInput from '../../routes/shared/createAPollValidation'
import { resetNewPoll } from '../../redux/createNewPoll'
import { submitNewPoll } from '../../redux/apiCalls.js'

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
        .then(response => {
          console.log('Success!!:', response)
        })
        .catch(err => {
          console.error('Poll could not be saved', err)
        })
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

const mapStateToProps = (state) => {
  return {
    newPollTitle: state.newPollTitle,
    newPollOptions: state.newPollOptions,
    user: state.user
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    dispatchResetNewPoll () {
      dispatch(resetNewPoll())
    },
    dispatchSubmitNewPoll (newPoll) {
      dispatch(submitNewPoll(newPoll))
    }
  }
}

let connected = connect(mapStateToProps, mapDispatchToProps)(SaveOrReset)

export const DisconnectedSaveOrReset = SaveOrReset

export default connected
