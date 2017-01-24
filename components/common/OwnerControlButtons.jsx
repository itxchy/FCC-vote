import React from 'react'
const { string, object, bool } = React.PropTypes

const OwnerControlButtons = React.createClass({
  propTypes: {
    owner: string,
    user: object,
    results: bool
  },
  render () {
    const resultsControlButtons = (
      <div>
        <a><i className='fa fa-cog poll-edit-buttons poll-results-settings-button' aria-hidden='true' /></a>
        <a><i className='fa fa-trash-o poll-edit-buttons poll-results-delete-button' aria-hidden='true' /></a>
      </div>
    )
    const pollCardControlButtons = (
      <div>
        <a><i className='fa fa-cog poll-edit-buttons poll-card-settings-button' aria-hidden='true' /></a>
        <a><i className='fa fa-trash-o poll-edit-buttons poll-card-delete-button' aria-hidden='true' /></a>
      </div>
    )
    const controlButtons = this.props.results ? resultsControlButtons : pollCardControlButtons
    const pollOwner = this.props.owner === this.props.user.username
    return (
      <div>
        {pollOwner ? controlButtons : null}
      </div>
    )
  }
})

export default OwnerControlButtons
