const React = require('react')
const { connector } = require('../redux/Store')
const { object } = React.PropTypes

const Home = React.createClass({
  propTypes: {
    recentPolls: object
  },
  render () {
    let showPolls = null
    if (this.props.recentPolls) {
      showPolls = this.props.recentPolls.map(poll => {
        return <div> A poll</div>
      })
    } else {
      showPolls = (
        <div className='text-center'>
          <h3>No polls have been submitted yet :(</h3>
          <p>Why not create one?</p>
        </div>
      )
    }

    return (
      <div>
        <h1 className='view-title text-center'>Latest Polls</h1>
        {showPolls}
      </div>
    )
  }
})

module.exports = connector(Home)
