import React from 'react'
import { Link } from 'react-router'
const { string, object, bool } = React.PropTypes

const OwnerControlButtons = React.createClass({
  propTypes: {
    id: string,
    owner: string,
    user: object,
    results: bool
  },
  handleDeleteButtonClick () {
    
  },
  render () {
    const resultsControlButtons = (
      <div>
        <Link to={`/edit/${this.props.id}`}><i className='fa fa-cog poll-edit-buttons poll-results-settings-button' aria-hidden='true' /></Link>
        <a><i className='fa fa-trash-o poll-edit-buttons poll-results-delete-button' aria-hidden='true' /></a>
      </div>
    )
    const pollCardControlButtons = (
      <div>
        <Link to={`/edit/${this.props.id}`}><i className='fa fa-cog poll-edit-buttons poll-card-settings-button' aria-hidden='true' /></Link>
        <a>
          <i
            className='fa fa-trash-o poll-edit-buttons poll-card-delete-button'
            data-toggle='modal'
            data-target='#deleteModal'
            aria-hidden='true'
          />
        </a>
      </div>
    )
    const controlButtons = this.props.results ? resultsControlButtons : pollCardControlButtons
    const pollOwner = this.props.owner === this.props.user.username
    return (
      <div>
        {pollOwner ? controlButtons : null}

        <div className='modal fade' id='deleteModal' tabIndex='-1' role='dialog' aria-labelledby='myModalLabel'>
          <div className='modal-dialog' role='document'>
            <div className='modal-content'>
              <div className='modal-header'>
                <button type='button' className='close' data-dismiss='modal' aria-label='Close'><span aria-hidden='true'>&times;</span></button>
                <h2 className='modal-title' id='myModalLabel'>Are you sure?</h2>
              </div>
              <div className='modal-body'>
                <h4>This poll and all of its data will be gone forever.</h4>
              </div>
              <div className='modal-footer'>
                <button type='button' className='btn btn-default' data-dismiss='modal'>Cancel</button>
                <button type='button' className='btn btn-danger'>Delete</button>
              </div>
            </div>
          </div>
        </div>

      </div>
    )
  }
})

export default OwnerControlButtons
