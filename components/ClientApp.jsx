/* global localStorage */

import React from 'react'
import { Router, browserHistory } from 'react-router'
import store from '../redux/Store'
import { setCurrentUser, getClientIp } from '../redux/modules/auth'
import { Provider } from 'react-redux'
import jwt from 'jsonwebtoken'
import setAuthorizationToken from '../auth/setAuthorizationToken'
import Routes from './Routes'

const App = React.createClass({
  render () {
    if (localStorage.jwtToken) {
      setAuthorizationToken(localStorage.jwtToken)
      const decodedToken = jwt.decode(localStorage.jwtToken)
      store.dispatch(setCurrentUser(decodedToken))
    } else {
      store.dispatch(getClientIp())
      store.dispatch(setCurrentUser({}))
    }
    return (
      <Provider store={store}>
        <Router history={browserHistory}>
          {Routes()}
        </Router>
      </Provider>
    )
  }
})

export default App
