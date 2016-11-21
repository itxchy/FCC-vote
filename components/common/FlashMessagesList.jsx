const React = require('react')
const { connector } = require('../../redux/Store')
const FlashMessage = require('./FlashMessage')
const { array } = React.PropTypes

const FlashMessagesList = React.createClass({
  propTypes: {
    flashMessages: array.isRequired
  },
  render () {
    const messages = this.props.flashMessages.map(message => 
      <FlashMessage key={message.id} message={message} />
    )
    return (
      <div>
        {messages}
      </div>
    )
  }
})

module.exports = connector(FlashMessagesList)
