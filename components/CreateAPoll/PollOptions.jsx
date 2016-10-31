const React = require('react')
const { connector } = require('../../redux/Store')
const { array, func } = React.PropTypes

const PollOptions = React.createClass({
  propTypes: {
    newPollOptions: array,
    updateOption: func
  },
  editOption (event) {
    let updatedOptions = this.props.newPollOptions
    console.log(`event: ${event.target.value}`)
    updatedOptions[event.target.name] = event.target.value
    console.log(`updatedOptions: ${updatedOptions}`)
    this.props.updateOption(updatedOptions)
  },
  render () {
    let options = this.props.newPollOptions.map((option, index) => {
      return (
        <input
          key={option}
          type='text'
          value={option}
          name={index}
          onChange={this.editOption}
        />
      )
    })
    return (
      <div>
        {options}
      </div>
    )
  }
})

module.exports = connector(PollOptions)
