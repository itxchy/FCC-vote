import React from 'react'
import { Link } from 'react-router'
import classnames from 'classnames'
import OwnerControlButtons from './OwnerControlButtons'
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
      updatedTotalVotes: null,
      noOptionSelected: false
    }
  },
  onOptionChange (event) {
    this.setState({
      selectedOption: event.target.value,
      noOptionSelected: false
    })
  },
  onVoteSubmit (event) {
    event.preventDefault()
    const pollID = this.props.id
    let selectedOption = this.state.selectedOption
    let voter = null
    if (this.props.user) {
      voter = this.props.user.username || null
    }
    if (selectedOption !== null) {
      const vote = { selectedOption, voter }
      this.props.dispatchSubmitVote(pollID, vote)
    } else {
      this.setState({ noOptionSelected: true })
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
    const noOptionSelectedError = (
      <div className='row none-selected-error'>
        <i className='fa fa-exclamation-triangle' aria-hidden='true' /> Select an option before submitting
      </div>
    )
    return (
      <div className={classnames('col-sm-4 sm-poll-card-container-width', { 'center-div-horizontally': this.props.singlePoll })}>
        <form className='col-md-10 poll-form' onSubmit={this.onVoteSubmit}>
          <h2 className='row sm-text-algin-center'>
            <Link to={`/v/${this.props.id}`}>{this.props.title}</Link>
          </h2>
          <OwnerControlButtons
            id={this.props.id}
            owner={this.props.owner}
            user={this.props.user}
            results={false}
          />
          <fieldset className='form-group row'>
            <div className='col-md-10'>
              {options}
            </div>
          </fieldset>
          <p className='poll-tally-owner-display total-votes-tally'>Total Votes: {this.state.updatedTotalVotes || this.props.totalVotes}</p>
          <p className='poll-tally-owner-display'>Poll Owner: {this.props.owner}</p>
          <div className='form-group row'>
            <div className='offset-sm-2 col-sm-10'>
              {this.state.noOptionSelected ? noOptionSelectedError : null}
              <button type='submit' className='btn btn-primary'>Vote</button>
            </div>
          </div>
        </form>
      </div>
    )
  }
})

export default PollCard
