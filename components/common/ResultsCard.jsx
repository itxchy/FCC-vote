const React = require('react')
const { connector } = require('../../redux/Store')
const { string, array, number, object, func } = React.PropTypes

const ResultsCard = React.createClass({
  propTypes: {
    title: string,
    options: array,
    totalVotes: number,
    id: string,
    user: object
  },
  render () {
    return (
      <div className='col-sm-4'>
        <h2>{this.props.title}</h2>
        <div className='col-sm-10'>
          <D3Chart results={this.props.options} />
        </div>
        <p>Total votes: {this.props.totalVotes}</p>
      </div>
    )
  }
})

module.exports = connector(ResultsCard)