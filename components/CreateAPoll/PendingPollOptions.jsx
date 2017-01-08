import React from 'react'
import { connect } from 'react-redux'
import { updateOption } from '../../redux/modules/createNewPoll'
const { object, func } = React.PropTypes

const PendingPollOptions = React.createClass({
  propTypes: {
    newPoll: object.isRequired,
    dispatchUpdateOption: func.isRequired
  },
  editOption (event) {
    let updatedOptions = this.props.newPoll.newPollOptions
    updatedOptions[event.target.name] = event.target.value
    this.props.dispatchUpdateOption(updatedOptions)
  },
  addAnotherOption () {
    console.log('addAnotherOption prop:', this.props.newPoll.newPollOptions)
    let updatedNewOptions = this.props.newPoll.newPollOptions
    updatedNewOptions.push('')
    this.props.dispatchUpdateOption(updatedNewOptions)
  },
  deleteOption (index) {
    if (this.props.newPoll.newPollOptions.length === 2) {
      console.log('Two or more options required!')
      return
    }
    let updatedDeleteOptions = this.props.newPoll.newPollOptions
    updatedDeleteOptions.splice(index, 1)
    this.props.dispatchUpdateOption(updatedDeleteOptions)
  },
  render () {
    let options = this.props.newPoll.newPollOptions.map((option, index) => {
      return (
        <div key={index}>
          <input
            type='text'
            value={option}
            name={index}
            placeholder={`Option ${index + 1}`}
            onChange={this.editOption}
            className='form-control option-input'
          />
          <a
            className='btn btn-danger delete-button'
            href='#'
            onClick={() => this.deleteOption(index)}
            aria-label='Delete'
          >
            <i className='fa fa-trash-o' aria-hidden='true' />
          </a>
        </div>
      )
    })
    return (
      <div className='form-group options-container'>
        {options}
        <a href='#'>
          <p className='add-another-option' onClick={this.addAnotherOption}>
            <i className='fa fa-plus-circle' aria-hidden='true' /> Add another option
          </p>
        </a>
      </div>
    )
  }
})

const mapStateToProps = (state) => {
  console.log('state should contain newPollOptions', state)
  return {
    newPoll: state.newPoll
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    dispatchUpdateOption (newOptions) {
      dispatch(updateOption(newOptions))
    }
  }
}
// This exports the component itself for testing
export const DisconnectedPendingPollOptions = PendingPollOptions

export default connect(mapStateToProps, mapDispatchToProps)(PendingPollOptions)
