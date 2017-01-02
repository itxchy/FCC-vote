import React from 'react'
import { Route, IndexRoute } from 'react-router'
import Layout from './Layout'
import Home from './Home'
import CreateAPoll from './CreateAPoll/CreateAPoll'
import Signup from './Signup/Signup'
import LoginPage from './Login/LoginPage'
import MyPollsPage from './MyPolls/MyPollsPage'

export const Routes = () => (
  <Route path='/' component={Layout}>
    <IndexRoute component={Home} />
    <Route path='create' component={CreateAPoll} />
    <Route path='mypolls' component={MyPollsPage} />
    <Route path='signup' component={Signup} />
    <Route path='login' component={LoginPage} />
  </Route>
)

export default Routes
