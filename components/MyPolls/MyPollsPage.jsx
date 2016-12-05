const React = require('react')
const { func, object } = React.PropTypes

const MyPollsPage = React.createClass({
  propTypes: {
    getUserPolls: func,
    user: object
  },
  render () {
    const userPolls = this.props.getUserPolls(this.props.user.username)
    console.log('userPolls', userPolls)
    return (
      <div>
        <pre><code>{JSON.stringify(userPolls)}</code></pre>
      </div>
    )
  }
})

module.exports = MyPollsPage
