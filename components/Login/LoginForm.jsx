const React = require('react')
const { connector } = require('../../redux/Store')
const TextFieldGroup = require('../common/TextFieldGroup')

const LoginForm = React.createClass({
  getInitialState () {
    return {
      identifier: '',
      password: '',
      errors: '',
      isLoading: false
    }
  },

  onSubmit (event) {
    event.preventDefault()
  },

  onChange (event) {
    this.setState({ [event.target.name]: event.target.value })
  },

  render () {
    const { errors, identifier, password, isLoading } = this.state
    return (
      <form onSubmit={this.onSubmit}>
        <h1>Login</h1>

        <TextFieldGroup
          field='identifier'
          label='Username or Email'
          value={identifier}
          errors={errors.identifier}
          onChange={this.onChange}
        />

        <TextFieldGroup
          field='password'
          label='Password'
          value={password}
          error={errors.password}
          onChange={this.onChange}
          type='password'
        />

      </form>
    )
  }
})

module.exports = connector(LoginForm)
