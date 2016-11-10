const React = require('react')
const { connector } = require('../../redux/Store')
const { string } = React.PropTypes

const SaveOrReset = React.createClass({
  propTypes: {
    newPollTitle: string
  },
  render () {
    return (
      <div className='text-center'>
        <button className='btn btn-primary'>Save</button>
        <button className='btn'>Reset</button>
      </div>
    )
  }
})

module.exports = connector(SaveOrReset)
