/* global localStorage */

const React = require('react')
const { Router, Route, browserHistory, IndexRoute } = require('react-router')
const { store, SET_CURRENT_USER } = require('../redux/Store')
const { Provider } = require('react-redux')
const jwt = require('jsonwebtoken')
const Layout = require('./Layout')
const Home = require('./Home')
const CreateAPoll = require('./CreateAPoll/CreateAPoll')
const Signup = require('./Signup/Signup')
const LoginPage = require('./Login/LoginPage')
const setAuthorizationToken = require('../auth/setAuthorizationToken')

const Routes = () => (
  <Route path='/' component={Layout}>
    <IndexRoute component={Home} />
    <Route path='create' component={CreateAPoll} />
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

module.exports = App
