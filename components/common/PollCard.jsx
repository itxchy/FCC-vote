const React = require('react')
const { connector } = require('../../redux/Store')
const { string, array, number, object } = React.PropTypes

const PollCard = React.createClass({
  propTypes: {
    title: string,
    options: array,
    totalVotes: string,
    id: number,
    user: object
  },
  getInitialState () {
    return {
      selectedOption: ''
    }
  },
  onOptionChange (event) {
    console.log('poll option selected!', event.target.value)
    this.setState({selectedOption: event.target.value})
  },
  onPollSubmit (event) {
    event.preventDefault()
    const selectedOption = +this.state.selectedOption
    const pollID = this.props.id
    const voter = this.props.user.username || null

    if (selectedOption !== '') {
      console.log('selectedOption:', selectedOption, 'pollID:', pollID, 'voter:', voter)
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
      <div className='col-md-4'>
        <form onSubmit={this.onPollSubmit}>
          <h2>{this.props.title}</h2>
          <fieldset className='form-group row'>
            <div className='col-sm-10'>
              {options}
            </div>
          </fieldset>
          <p>Total votes cast: {this.props.totalVotes}</p>
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

module.exports = connector(PollCard)
