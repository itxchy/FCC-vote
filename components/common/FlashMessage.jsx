const React = require('react')
const { connector } = require('../../redux/Store')
const classnames = require('classnames')
const { object, func } = React.PropTypes

const FlashMessage = React.createClass({
  propTypes: {
    message: object.isRequired,
    deleteFlashMessage: func.isRequired
  },

  onClick () {
    this.props.deleteFlashMessage(this.props.message.id)
  },
  render () {
    const { id, messageType, messageText } = this.props.message
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

module.exports = connector(FlashMessage)
