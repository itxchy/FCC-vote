const React = require('react')
const NavBar = require('./NavBar')
const FlashMessagesList = require('./common/FlashMessagesList')

const Layout = (props) => (
  <div className='container'>
    <NavBar />
    <FlashMessagesList />
    {props.children}
  </div>
)

const { element } = React.PropTypes

Layout.propTypes = {
  children: element.isRequired
}

module.exports = Layout
