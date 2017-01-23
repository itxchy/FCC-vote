import React from 'react'
import NewPollTitle from './NewPollTitle'
import PendingPollOptions from './PendingPollOptions'
import SaveOrReset from './SaveOrReset'

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

export default CreateAPoll
