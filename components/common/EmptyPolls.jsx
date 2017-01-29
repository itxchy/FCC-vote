import React from 'react'
import LoadingSpinner from './LoadingSpinner'
const { bool } = React.PropTypes

const EmptyPolls = ({polls}) => {
  if (polls === null) {
    return (
      <div className='text-center'>
        <LoadingSpinner />
      </div>
    )
  }
  if (polls === false) {
    return (
      <div className='text-center'>
        <h3>No polls have been submitted yet :(</h3>
        <p>Why not create one?</p>
      </div>
    )
  }
  return (
    <div className='text-center'>
      <h3>Something went wrong!</h3>
      <p>Polls should be showing up here, but alas... Life isn't perfect :(</p>
      <p>Please report this.</p>
    </div>
  )
}

EmptyPolls.propTypes = {
  polls: bool
}

export default EmptyPolls
