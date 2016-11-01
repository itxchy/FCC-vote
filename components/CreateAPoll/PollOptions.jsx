const React = require('react')
const { connector } = require('../../redux/Store')
const { array, func } = React.PropTypes

const PollOptions = React.createClass({
  propTypes: {
    newPollOptions: array.isRequired,
    updateOption: func.isRequired
  },
  editOption (event) {
    let updatedOptions = this.props.newPollOptions.slice()
    updatedOptions[event.target.name] = event.target.value
    this.props.updateOption(updatedOptions)
  },
  addAnotherOption () {
    let updatedNewOptions = this.props.newPollOptions.slice()
    updatedNewOptions.push('')
    this.props.updateOption(updatedNewOptions)
  },
  render () {
    let options = this.props.newPollOptions.map((option, index) => {
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

module.exports = connector(PollOptions)
