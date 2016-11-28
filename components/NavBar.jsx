const React = require('react')
const { connector } = require('../redux/Store')
const { string, bool } = React.PropTypes
const { Link } = require('react-router')

const NavBar = React.createClass({
  propTypes: {
    userName: string,
    isLoggedIn: bool
  },
  render () {
    let showNav
    if (this.props.isLoggedIn) {
      showNav = (
        <div className='collapse navbar-collapse' id='bs-example-navbar-collapse-1'>
          <ul className='nav navbar-nav'>
            <li className='active'><a href='#'>My Polls</a></li>
            <li><Link to='/create'>Create a Poll</Link></li>
          </ul>
          <ul className='nav navbar-nav navbar-right'>
            <li><a href='#'>Welcome back, {this.props.userName}!</a></li>
          </ul>
        </div>
      )
    } else {
      showNav = (
        <div className='collapse navbar-collapse' id='bs-example-navbar-collapse-1'>
          <ul className='nav navbar-nav navbar-right'>
            <li><Link to='/signup'>Sign up</Link></li>
            <li><Link to='/login'>Login</Link></li>
          </ul>
        </div>
      )
    }
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

          {showNav}

        </div>
      </nav>
    )
  }
})

module.exports = connector(NavBar)
