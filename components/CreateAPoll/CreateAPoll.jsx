const React = require('react')
const { connector } = require('../../redux/Store')
const NewPollTitle = require('./NewPollTitle')
const PendingPollOptions = require('./PendingPollOptions')
const SaveOrReset = require('./SaveOrReset')

const CreateAPoll = React.createClass({
  render () {
    return (
      <div>
        <h1 className='view-title text-center'>Create a New Poll</h1>
        <NewPollTitle />
        <PendingPollOptions />
        <SaveOrReset />
      </div>
    )
  }
})

module.exports = connector(CreateAPoll)
