import React from 'react'
import { Link } from 'react-router'
import classnames from 'classnames'
const { string, array, number, object, func, bool } = React.PropTypes

const PollCard = React.createClass({
  propTypes: {
    title: string,
    options: array,
    totalVotes: number,
    id: string,
    user: object,
    dispatchSubmitVote: func.isRequired,
    singlePoll: bool,
    owner: string
  },
  getInitialState () {
    return {
      selectedOption: null,
      updatedTotalVotes: null
    }
  },
  onOptionChange (event) {
    this.setState({ selectedOption: event.target.value })
  },
  onVoteSubmit (event) {
    event.preventDefault()
    const pollID = this.props.id
    let selectedOption = this.state.selectedOption
    const voter = this.props.user.username || null
    if (selectedOption !== null) {
      const vote = { selectedOption, voter }
      this.props.dispatchSubmitVote(pollID, vote)
    } else {
      console.log('no poll option selected!')
    }
  },
  render () {
    const options = this.props.options.map((option, index) => {
      const id = `gridRadios${index}`
      const value = `${index}`
      return (
        <div key={option.option} className='form-check'>
          <label className='form-check-label poll-card-label'>
            <input
              className='form-check-input radio-option'
              type='radio'
              onChange={this.onOptionChange}
              name='gridRadios'
              id={id}
              value={value}
            />
            {option.option}
          </label>
        </div>
      )
    })
    return (
      <div className={classnames('col-sm-4', { 'center-div-horizontally': this.props.singlePoll })}>
        <form onSubmit={this.onVoteSubmit}>
          <h2><Link to={`/v/${this.props.id}`}>{this.props.title}</Link></h2>
          <fieldset className='form-group row'>
            <div className='col-sm-10'>
              {options}
            </div>
          </fieldset>
          <p>Total votes cast: {this.state.updatedTotalVotes || this.props.totalVotes}</p>
          <p>Poll Owner: {this.props.owner}</p>
          <div className='form-group row'>
            <div className='offset-sm-2 col-sm-10'>
              <button type='submit' className='btn btn-primary'>Vote</button>
            </div>
          </div>
        </form>
      </div>
    )
  }
})

export default PollCard
