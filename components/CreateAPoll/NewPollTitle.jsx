const React = require('react')
const { connector } = require('../../redux/Store')
const { string, func, bool } = React.PropTypes

const NewPollTitle = React.createClass({
  propTypes: {
    newPollTitle: string,
    setNewPollTitle: func,
    titleEditable: bool,
    setTitleEditable: func
  },
  handleNewPollTitleChange (event) {
    this.props.setNewPollTitle(event.target.value)
  },
  render () {
    let savedPollTitle = () => (
      <div className='new-poll-title-container'>
        <h2 className='text-center'>{this.props.newPollTitle}</h2>
      </div>
    )
    let inputPollTitle = (
      <div className='new-poll-title-container'>
        <input
          value={this.props.newPollTitle}
          onChange={this.handleNewPollTitleChange}
          type='text'
          placeholder='New Poll Title'
          className='text-center form-control new-poll-title-input'
        />
        <i className='fa fa-floppy-o save-icon' aria-hidden='true' />
      </div>
    )

    return (
      <div className='new-poll-title-container'>
        {inputPollTitle}
      </div>
    )
  }
})

module.exports = connector(NewPollTitle)
