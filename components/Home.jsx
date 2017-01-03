import React from 'react'
import { connect } from 'react-redux'
import PollCard from './common/PollCard'
import ResultsCard from './common/ResultsCard'
import { getAllPolls } from '../redux/modules/getAllPolls'
const { func, object } = React.PropTypes
import { dupeVoterCheck } from '../routes/lib/pollsLib'
import isEmpty from 'lodash/isEmpty'

const Home = React.createClass({
  propTypes: {
    dispatchGetAllPolls: func,
    user: object,
    allPolls: object
  },
  getRecentPolls () {
    if (this.props.allPolls === null) {
      this.props.dispatchGetAllPolls()
    }
  },
  populatedCards () {
    return this.props.allPolls.allPolls.map(poll => {
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
    if (this.props.allPolls === null) {
      return (
        <div className='text-center'>
          <h3>loading...</h3>
        </div>
      )
    }
    if (this.props.allPolls === false) {
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
    console.log('this.props.allPolls', this.props.allPolls)
    if (isEmpty(this.props.allPolls)) {
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

const mapStateToProps = (state) => {
  return {
    user: state.user,
    allPolls: state.allPolls
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    dispatchGetAllPolls () {
      dispatch(getAllPolls())
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)
