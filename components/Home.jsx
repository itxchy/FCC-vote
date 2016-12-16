const React = require('react')
const { connector } = require('../redux/Store')
const PollCard = require('./common/PollCard')
const { func } = React.PropTypes

const Home = React.createClass({
  propTypes: {
    getAllPolls: func
  },
  getInitialState () {
    return {
      allPolls: null
    }
  },
  getRecentPolls () {
    if (this.state.allPolls === null) {
      this.props.getAllPolls()
      .then(res => {
        if (res.data.length > 0) {
          this.setState({ allPolls: res.data })
        } else {
          this.setState({ allPolls: false })
        }
      })
    }
  },
  render () {
    let showPolls = null
    this.getRecentPolls()

    if (this.state.allPolls) {
      showPolls = this.state.allPolls.map(poll => {
        const { title, options, totalVotes, _id } = poll
        console.log('poll info passed to PollCard:', {_id, title, options, totalVotes})
        return (
          <PollCard
            key={_id}
            title={title}
            options={options}
            totalVotes={totalVotes}
            id={_id}
          />
        )
      })
    } else if (this.state.allPolls === null) {
      showPolls = (
        <div className='text-center'>
          <h3>loading...</h3>
        </div>
      )
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
        <div className='row'>
          {showPolls}
        </div>
      </div>
    )
  }
})

module.exports = connector(Home)
