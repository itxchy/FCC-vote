const React = require('react')
const { connector } = require('../../redux/Store')
const { string, func, array, object } = React.PropTypes
const validateCreateAPollInput = require('../../routes/shared/createAPollValidation')

const SaveOrReset = React.createClass({
  propTypes: {
    newPollTitle: string,
    resetNewPoll: func,
    newPollOptions: array,
    submitNewPoll: func.isRequired,
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
      this.props.submitNewPoll(newPoll)
        .then(response => {
          console.log('Success!!:', response)
        })
        .catch(err => {
          console.error('Poll could not be saved', err)
        })
    }
  },
  resetButtonHandler () {
    this.props.resetNewPoll(true)
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

let connected = connector(SaveOrReset)

connected.DisconnectedSaveOrReset = SaveOrReset

module.exports = connected
