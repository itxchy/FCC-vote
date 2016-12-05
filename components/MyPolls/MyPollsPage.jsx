const React = require('react')
const { connector } = require('../../redux/Store')
const isEmpty = require('lodash/isEmpty')
const { func, object } = React.PropTypes

const MyPollsPage = React.createClass({
  propTypes: {
    getUserPolls: func,
    user: object
  },
  getInitialState () {
    return {
      myPolls: {}
    }
  },
  componentWillUnmount () {
    this.setState({myPolls: {}})
  },
  render () {
    const username = this.props.user.username

    if(isEmpty(this.state.myPolls)) {
      this.props.getUserPolls(username).then(res => {
        console.log('getUserPolls res:', res)
        this.setState({myPolls: res})
      })
    }

    return (
      <div>
        <pre><code>{JSON.stringify(this.state.myPolls, null, 4)}</code></pre>
      </div>
    )
  }
})

module.exports = connector(MyPollsPage)
