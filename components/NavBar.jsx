import React from 'react'
import { connect } from 'react-redux'
const { object, func } = React.PropTypes
import { Link } from 'react-router'
import { logout, getClientIp } from '../redux/modules/auth'

const NavBar = React.createClass({
  propTypes: {
    user: object,
    dispatchLogout: func.isRequired,
    dispatchGetClientIp: func.isRequired
  },
  getInitialState () {
    return {
      isMounted: false
    }
  },
  logout (event) {
    event.preventDefault()
    this.props.dispatchLogout()
    this.props.dispatchGetClientIp()
  },
  componentDidMount () {
    this.setState({ isMounted: true })
  },
  render () {
    let username = this.props.user.user ? this.props.user.user.username : null
    let showAuthenticatedNav = (
      <div className='collapse navbar-collapse' id='bs-example-navbar-collapse-1'>
        <ul className='nav navbar-nav'>
          <li><Link to='/mypolls'>My Polls</Link></li>
          <li><Link to='/create'>Create a Poll</Link></li>
        </ul>
        <ul className='nav navbar-nav navbar-right'>
          <li><p className='navbar-text'>Welcome back, {username}!</p></li>
          <li><a href='#' onClick={this.logout}>Logout</a></li>
        </ul>
      </div>
    )

    let showGuestNav = (
      <div className='collapse navbar-collapse' id='bs-example-navbar-collapse-1'>
        <ul className='nav navbar-nav navbar-right'>
          <li><Link to='/signup'>Sign up</Link></li>
          <li><Link to='/login'>Login</Link></li>
        </ul>
      </div>
    )
    return (
      <nav className='navbar navbar-default'>
        <div className='container-fluid'>
          <div className='navbar-header'>
            <button type='button' className='navbar-toggle collapsed' data-toggle='collapse' data-target='#bs-example-navbar-collapse-1' aria-expanded='false'>
              <span className='sr-only'>Toggle navigation</span>
              <span className='icon-bar' />
              <span className='icon-bar' />
              <span className='icon-bar' />
            </button>
            <Link to='/' className='navbar-brand'>Vote.</Link>
          </div>

          {this.state.isMounted && this.props.user.isAuthenticated ? showAuthenticatedNav : showGuestNav}

        </div>
      </nav>
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
    dispatchLogout () {
      dispatch(logout())
    },
    dispatchGetClientIp () {
      dispatch(getClientIp())
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NavBar)
