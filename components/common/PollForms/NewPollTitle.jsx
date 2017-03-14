import React from 'react'
const { string, func, bool } = React.PropTypes

const NewPollTitle = React.createClass({
  propTypes: {
    newPollTitle: string,
    titleEditable: bool,
    dispatchSetNewPollTitle: func,
    dispatchSetTitleEditable: func,
    editPoll: bool
  },
  handleNewPollTitleChange (event) {
    this.props.dispatchSetNewPollTitle(event.target.value)
  },
  handleSaveClick (event) {
    if (this.props.newPollTitle === '') {
      this.props.dispatchSetNewPollTitle('New Poll Title')
    }
    this.props.dispatchSetTitleEditable(false)
  },
  handleEditClick (event) {
    this.props.dispatchSetTitleEditable(true)
  },
  render () {
    let savedPollTitle = (
      <div className='new-poll-title-container'>
        <h2 className='text-center saved-title'>{this.props.newPollTitle}</h2>
        <a>
          <i
            className='fa fa-pencil-square-o edit-icon show-mouse-pointer'
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
        <a>
          <i
            className='fa fa-floppy-o save-icon show-mouse-pointer'
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

export default NewPollTitle
