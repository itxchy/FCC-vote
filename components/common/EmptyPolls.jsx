import React from 'react'
const { array } = React.PropTypes

const EmptyPolls = ({polls}) => {
  if (polls === null) {
    return (
      <div className='text-center'>
        <h3>loading...</h3>
      </div>
    )
  }
  if (polls === false) {
    <div className='text-center'>
      <h3>No polls have been submitted yet :(</h3>
      <p>Why not create one?</p>
    </div>
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
  polls: array
}

export default EmptyPolls
