import React from 'react'
import NavBar from './NavBar'
import FlashMessagesList from './common/FlashMessagesList'
const { element } = React.PropTypes

const Layout = (props) => (
  <div className='container'>
    <NavBar />
    <FlashMessagesList />
    {props.children}
  </div>
)

Layout.propTypes = {
  children: element.isRequired
}

export default Layout
