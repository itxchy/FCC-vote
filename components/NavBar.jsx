const React = require('react')
const { connector } = require('../redux/Store')
const { object, bool, func } = React.PropTypes
const { Link } = require('react-router')

const NavBar = React.createClass({
  propTypes: {
    user: object,
    isAuthenticated: bool,
    logout: func
  },
  logout (event) {
    event.preventDefault()
    this.props.logout()
  },
  render () {
    let showAuthenticatedNav = (
      <div className='collapse navbar-collapse' id='bs-example-navbar-collapse-1'>
        <ul className='nav navbar-nav'>
          <li><Link to='/mypolls'>My Polls</Link></li>
          <li><Link to='/create'>Create a Poll</Link></li>
        </ul>
        <ul className='nav navbar-nav navbar-right'>
          <li><p className='navbar-text'>Welcome back, {this.props.user.username}!</p></li>
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

          {this.props.isAuthenticated ? showAuthenticatedNav : showGuestNav}

        </div>
      </nav>
    )
  }
})

module.exports = connector(NavBar)
