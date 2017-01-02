import React from 'react'
import { connect } from 'react-redux'
import FlashMessage from './FlashMessage'
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

const mapStateToProps = (state) => {
  return {
    flashMessages: state.flashMessages
  }
}

export default connect(mapStateToProps)(FlashMessagesList)
