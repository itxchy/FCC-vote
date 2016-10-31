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
  handleSaveClick (event) {
    console.log(event)
    if (this.props.newPollTitle === '') {
      this.props.setNewPollTitle('New Poll Title')
    }
    this.props.setTitleEditable(false)
  },
  handleEditClick (event) {
    this.props.setTitleEditable(true)
  },
  render () {
    let savedPollTitle = (
      <div className='new-poll-title-container'>
        <h2 className='text-center saved-title'>{this.props.newPollTitle}</h2>
        <a href='#'>
          <i
            className='fa fa-pencil-square-o save-icon'
            aria-hidden='true'
            onClick={this.handleEditClick}
          />
        </a>
      </div>
    )
    let inputPollTitle = (
      <div className='new-poll-title-container'>
        <textarea
          value={this.props.newPollTitle}
          onChange={this.handleNewPollTitleChange}
          type='text'
          placeholder='New Poll Title'
          className='text-center form-control new-poll-title-textarea'
        />
        <a href='#'>
          <i
            className='fa fa-floppy-o save-icon'
            aria-hidden='true'
            onClick={this.handleSaveClick}
          />
        </a>
      </div>
    )

    return (
      <div className='new-poll-title-container'>
        {this.props.titleEditable
          ? inputPollTitle
          : savedPollTitle}
      </div>
    )
  }
})

module.exports = connector(NewPollTitle)
