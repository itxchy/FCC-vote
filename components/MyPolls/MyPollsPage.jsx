import React from 'react'
import { connect } from 'react-redux'
import isEmpty from 'lodash/isEmpty'
const { func, object } = React.PropTypes
import { getUserPolls } from '../../redux/apiCalls'

const MyPollsPage = React.createClass({
  propTypes: {
    dispatchGetUserPolls: func,
    user: object
  },
  getInitialState () {
    return {
      myPolls: {}
    }
  },
  getMyPolls () {
    const username = this.props.user.username

    if (username && isEmpty(this.state.myPolls)) {
      this.props.dispatchGetUserPolls(username).then(res => {
        if (res.data.length > 0) {
          this.setState({ myPolls: res.data })
        } else {
          this.setState({ myPolls: { polls: null } })
        }
      })
    }
  },
  render () {
    this.getMyPolls()
    return (
      <div>
        <pre><code>{JSON.stringify(this.state.myPolls, null, 4)}</code></pre>
      </div>
    )
  }
})

const mapStateToProps = (state) => {
  return {
    user: state.user
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    dispatchGetUserPolls (username) {
      dispatch(getUserPolls(username))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MyPollsPage)
