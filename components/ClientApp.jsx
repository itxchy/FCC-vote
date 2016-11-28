const React = require('react')
const { Router, Route, browserHistory, IndexRoute } = require('react-router')
const { store } = require('../redux/Store')
const { Provider } = require('react-redux')
const Layout = require('./Layout')
const Home = require('./Home')
const CreateAPoll = require('./CreateAPoll/CreateAPoll')
const Signup = require('./Signup/Signup')
const LoginPage = require('./Login/LoginPage')

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
