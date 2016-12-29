const React = require('react')
const { connector } = require('../redux/Store')
const PollCard = require('./common/PollCard')
const ResultsCard = require('./common/ResultsCard')
const { func, object } = React.PropTypes
const { dupeVoterCheck } = require('../routes/lib/pollsLib')
const isEmpty = require('lodash/isEmpty')

const Home = React.createClass({
  propTypes: {
    getAllPolls: func,
    user: object
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
  populatedCards () {
    return this.state.allPolls.map(poll => {
      const dupeVoter = dupeVoterCheck(poll, this.props.user.username)
      const { title, options, totalVotes, _id } = poll
      if (dupeVoter) {
        return (
          <ResultsCard
            key={_id}
            title={title}
            options={options}
            totalVotes={totalVotes}
            id={_id}
          />
        )
      }
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
  },
  handleEmptyAllPollsObject () {
    this.getRecentPolls()
    if (this.state.allPolls === null) {
      return (
        <div className='text-center'>
          <h3>loading...</h3>
        </div>
      )
    }
    if (this.state.allPolls === false) {
      return (
        <div className='text-center'>
          <h3>No polls have been submitted yet :(</h3>
          <p>Why not create one?</p>
        </div>
      )
    }
  },
  render () {
    this.getRecentPolls()
    let showPolls = null
    if (isEmpty(this.state.allPolls)) {
      showPolls = this.handleEmptyAllPollsObject()
    } else {
      showPolls = this.populatedCards()
      console.log('populatedCards:', showPolls)
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
