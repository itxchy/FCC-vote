import React from 'react'
const { object, func } = React.PropTypes

const PendingPollOptions = React.createClass({
  propTypes: {
    poll: object.isRequired,
    dispatchUpdateOption: func.isRequired
  },
  editOption (event) {
    let updatedOptions = this.props.poll.newPollOptions
    updatedOptions[event.target.name] = event.target.value
    this.props.dispatchUpdateOption(updatedOptions)
  },
  addAnotherOption () {
    console.log('addAnotherOption prop:', this.props.poll.newPollOptions)
    let updatedNewOptions = this.props.poll.newPollOptions
    updatedNewOptions.push('')
    this.props.dispatchUpdateOption(updatedNewOptions)
  },
  deleteOption (index) {
    if (this.props.poll.newPollOptions.length === 2) {
      console.log('Two or more options required!')
      return
    }
    let updatedDeleteOptions = this.props.poll.newPollOptions
    updatedDeleteOptions.splice(index, 1)
    this.props.dispatchUpdateOption(updatedDeleteOptions)
  },
  render () {
    let options = this.props.poll.newPollOptions.map((option, index) => {
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
        <a>
          <p className='add-another-option' onClick={this.addAnotherOption}>
            <i className='fa fa-plus-circle' aria-hidden='true' /> Add another option
          </p>
        </a>
      </div>
    )
  }
})

export default PendingPollOptions
