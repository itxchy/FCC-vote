import React from 'react'
import { connect } from 'react-redux'
import isEmpty from 'lodash/isEmpty'
const { func, object, array } = React.PropTypes
import { getUserPolls } from '../../redux/modules/getUserPolls'

const MyPollsPage = React.createClass({
  propTypes: {
    dispatchGetUserPolls: func.isRequired,
    user: object.isRequired,
    userPolls: array
  },
  getUserPolls () {
    if (this.props.user.user) {
      const username = this.props.user.user.username
      console.log(this.props.userPolls)
      if (username && isEmpty(this.props.userPolls)) {
        this.props.dispatchGetUserPolls(username)
      }
    }
  },
  render () {
    this.getUserPolls()
    return (
      <div>
        <pre><code>{JSON.stringify(this.props.userPolls, null, 4)}</code></pre>
      </div>
    )
  }
})

const mapStateToProps = (state) => {
  return {
    user: state.user,
    userPolls: state.userPolls.userPolls
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
