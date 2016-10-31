const React = require('react')
const { connector } = require('../../redux/Store')
const NewPollTitle = require('./NewPollTitle')

const CreateAPoll = React.createClass({
  render () {
    return (
      <div>
        <h1 className='view-title text-center'>Create a New Poll</h1>
        <NewPollTitle />
        {/* PollOptions component */}
        {/* Poll Submit Button */}
      </div>
    )
  }
})

module.exports = connector(CreateAPoll)
