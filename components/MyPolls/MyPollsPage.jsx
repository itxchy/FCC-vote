const React = require('react')
const { func, object } = React.PropTypes

const MyPollsPage = React.createClass({
  propTypes: {
    getUserPolls: func,
    user: object
  },
  render () {
    const userPolls = this.props.getUserPolls(this.props.user.username)
    return (
      <div>
        <pre><code>{JSON.stringify(userPolls)}</code></pre>        
      </div>
    )
  }
})