import React from 'react'
import { connect } from 'react-redux'
import { deletePoll } from '../../redux/modules/deletePoll'
const { string, func } = React.PropTypes

const DeleteModal = React.createClass({
  propTypes: {
    id: string,
    dispatchDeletePoll: func
  },
  handleDeleteButtonClick () {
    this.props.dispatchDeletePoll(this.props.id)
  },
  render () {
    return (
      <div className='modal fade' id={`deleteModal-${this.props.id}`} tabIndex='-1' role='dialog' aria-labelledby='myModalLabel'>
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
    )
  }
})

const mapDispatchToProps = (dispatch) => {
  return {
    dispatchDeletePoll (id) {
      dispatch(deletePoll(id))
    }
  }
}

export default connect(() => {}, mapDispatchToProps)(DeleteModal)
