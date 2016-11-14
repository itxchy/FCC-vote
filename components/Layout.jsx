const React = require('react')
const NavBar = require('./NavBar')

const Layout = (props) => (
  <div className='container'>
    <NavBar isLoggedIn={false} />
    {props.children}
  </div>
)

const { element } = React.PropTypes

Layout.propTypes = {
  children: element.isRequired
}

module.exports = Layout
