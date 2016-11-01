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
  render () {
    let options = this.props.newPollOptions.map((option, index) => {
      return (
        <input
          key={index}
          type='text'
          value={option}
          name={index}
          onChange={this.editOption}
          className='form-control option-input'
        />
      )
    })
    return (
      <div className='form-group options-container'>
        {options}
          <p className='add-another-option'>
            <i className="fa fa-plus-circle" aria-hidden="true" /> Add another option
          </p>
      </div>
    )
  }
})

module.exports = connector(PollOptions)
