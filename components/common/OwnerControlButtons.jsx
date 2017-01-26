import React from 'react'
import { Link } from 'react-router'
import DeleteModal from './DeleteModal'
const { string, object, bool } = React.PropTypes

const OwnerControlButtons = React.createClass({
  propTypes: {
    id: string,
    owner: string,
    user: object,
    results: bool
  },
  render () {
    const resultsControlButtons = (
      <div>
        <Link to={`/edit/${this.props.id}`}><i className='fa fa-cog poll-edit-buttons poll-results-settings-button' aria-hidden='true' /></Link>
        <a>
          <i
            className='fa fa-trash-o poll-edit-buttons poll-results-delete-button'
            data-toggle='modal'
            data-target={`#deleteModal-${this.props.id}`}
            aria-hidden='true'
          />
        </a>
      </div>
    )
    const pollCardControlButtons = (
      <div>
        <Link to={`/edit/${this.props.id}`}><i className='fa fa-cog poll-edit-buttons poll-card-settings-button' aria-hidden='true' /></Link>
        <a>
          <i
            className='fa fa-trash-o poll-edit-buttons poll-card-delete-button'
            data-toggle='modal'
            data-target={`#deleteModal-${this.props.id}`}
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
        <DeleteModal id={this.props.id} />
      </div>
    )
  }
})

export default OwnerControlButtons
