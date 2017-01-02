import React from 'react'
import { connect } from 'react-redux'
import classnames from 'classnames'
import { deleteFlashMessage } from '../../redux/modules/flashMessage'
const { object, func } = React.PropTypes

const FlashMessage = React.createClass({
  propTypes: {
    message: object.isRequired,
    dispatchDeleteFlashMessage: func.isRequired
  },

  onClick () {
    this.props.dispatchDeleteFlashMessage(this.props.message.id)
  },
  render () {
    const { messageType, messageText } = this.props.message
    return (
      <div className={classnames('alert', {
        'alert-success': messageType === 'success',
        'alert-danger': messageType === 'error'
      })}>
        <button onClick={this.onClick} className='close'><span>&times;</span></button>
        {messageText}
      </div>
    )
  }
})

const mapDispatchToProps = (dispatch) => {
  return {
    dispatchDeleteFlashMessage (id) {
      dispatch(deleteFlashMessage(id))
    }
  }
}

export default connect(mapDispatchToProps)(FlashMessage)
