/* global localStorage */

import React from 'react'
import { Router, Route, browserHistory, IndexRoute } from 'react-router'
import { store, SET_CURRENT_USER } from '../redux/Store'
import { Provider } from 'react-redux'
import jwt from 'jsonwebtoken'
import Layout from './Layout'
import Home from './Home'
import CreateAPoll from './CreateAPoll/CreateAPoll'
import Signup from './Signup/Signup'
import LoginPage from './Login/LoginPage'
import MyPollsPage from './MyPolls/MyPollsPage'
import setAuthorizationToken from '../auth/setAuthorizationToken'

const Routes = () => (
  <Route path='/' component={Layout}>
    <IndexRoute component={Home} />
    <Route path='create' component={CreateAPoll} />
    <Route path='mypolls' component={MyPollsPage} />
    <Route path='signup' component={Signup} />
    <Route path='login' component={LoginPage} />
  </Route>
)

const App = React.createClass({
  render () {
    if (localStorage.jwtToken) {
      setAuthorizationToken(localStorage.jwtToken)
      store.dispatch({type: SET_CURRENT_USER, user: jwt.decode(localStorage.jwtToken)})
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

App.Routes = Routes

export default App
