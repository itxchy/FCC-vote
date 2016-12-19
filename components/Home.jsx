const React = require('react')
const { connector } = require('../redux/Store')
const PollCard = require('./common/PollCard')
const { func } = React.PropTypes
const { dupeVoterCheck } = require('../routes/lib/pollsLib')

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
        console.log('poll mapped:', poll)
        const dupeVoter = dupeVoterCheck(poll, this.props.user.username)
        const { title, options, totalVotes, _id } = poll
        // if (dupeVoter) {
        //   return (
        //     <ResultsCard
        //       key={_id}
        //       title={title}
        //       options={options}
        //       totalVotes={totalVotes}
        //       id={_id}
        //     />  
        //   )  
        // }
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
