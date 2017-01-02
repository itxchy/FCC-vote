import React from 'react'
import NavBar from './NavBar'
import FlashMessagesList from './common/FlashMessagesList'
const { element } = React.PropTypes
import store from '../redux/Store'

const Layout = (props) => (
  <div className='container'>
    <NavBar store={store} />
    <FlashMessagesList store={store} />
    {props.children}
  </div>
)

Layout.propTypes = {
  children: element.isRequired
}

export default Layout
