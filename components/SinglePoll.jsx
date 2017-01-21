import React from 'react'
const { object } = React.PropTypes

const SinglePoll = React.createClass({
  propTypes: {
    routeParams: object
  },
  render () {
    return (
      <div>
        <h1>SinglePoll! {this.props.routeParams.id}</h1>
      </div>
    )
  }
})

export default SinglePoll
