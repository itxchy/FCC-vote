import React from 'react'
const { object } = React.PropTypes

const SinglePoll = React.createClass({
  propTypes: {
    routeParams: object
  },
  getPoll () {
    // TODO get individual poll object using poll id
  },
  componentWillMount () {
    this.getPoll()
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
