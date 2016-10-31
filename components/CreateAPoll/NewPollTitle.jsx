const React = require('react')
const { connector } = require('../../redux/Store')
const { string, func, bool } = React.PropTypes

const NewPollTitle = React.createClass({
  propTypes: {
    newPollTitle: string,
    setNewPollTitle: func,
    titleEditable: bool
  },
  handleNewPollTitleChange (event) {
    this.props.setNewPollTitle(event.target.value)
  },
  render () {
    let savedPollTitle = <h2 className='text-center'>{this.props.newPollTitle}</h2>
    let inputPollTitle = (
      <input
        value={this.props.newPollTitle}
        onChange={this.handleNewPollTitleChange}
        type='text'
        placeholder='New Poll Title'
        className='text-center form-control new-poll-title-input'
      />
    )

    return (
      <div className='new-poll-title-container'>
        {inputPollTitle}
      </div>
    )
  }
})

module.exports = connector(NewPollTitle)
