const React = require('react')
const { connector } = require('../../redux/Store')
const TextFieldGroup = require('../common/TextFieldGroup')
const validateInput = require('../../routes/shared/loginValidation')

const LoginForm = React.createClass({
  getInitialState () {
    return {
      identifier: '',
      password: '',
      errors: '',
      isLoading: false
    }
  },

  isValid () {
    const { errors, isValid } = validateInput(this.state)

    if (!isValid) {
      this.setState({ errors })
    }

    return isValid
  },

  onSubmit (event) {
    event.preventDefault()

    if (this.isValid()) {

    }
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
          label='Username / Email'
          value={identifier}
          error={errors.identifier}
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

        <div className='form-group'>
          <button className='button btn btn-primary btn-lg' disabled={isLoading}>Login</button>
        </div>

      </form>
    )
  }
})

module.exports = connector(LoginForm)
