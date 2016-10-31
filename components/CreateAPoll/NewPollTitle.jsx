const React = require('react')
const { connector } = require('../../redux/Store')
const { string, func } = React.PropTypes

const NewPollTitle = React.createClass({
  propTypes: {
    newPollTitle: string,
    setNewPollTitle: func
  },
  handleNewPollTitleChange (event) {
    this.props.setNewPollTitle(event.target.value)
  },
  render () {
    return (
      <div className='new-poll-title-container'>
        <input
          value={this.props.newPollTitle}
          onChange={this.handleNewPollTitleChange}
          type='text'
          placeholder='New Poll Title'
          className='text-center form-control new-poll-title-input'
        />
      </div>
    )
  }
})

module.exports = connector(NewPollTitle)
