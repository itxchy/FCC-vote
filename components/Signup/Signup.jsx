const React = require('react')
const { connector } = require('../../redux/Store')
const validateInput = require('../../routes/shared/signupValidation')
const TextFieldGroup = require('../common/TextFieldGroup')
const { func } = React.PropTypes

const Signup = React.createClass({
  propTypes: {
    userSignupRequest: func.isRequired
  },

  getInitialState () {
    return {
      username: '',
      email: '',
      password: '',
      passwordConfirmation: '',
      errors: {},
      isLoading: false
    }
  },

  onChange (event) {
    /**
     * instead of setting state with {username: event.target.value},
     * using [event.target.name] will allow this function to be reused
     * by other form fields with onChange events. Thank you Rem Zolotykh
     * for sharing this method.
     */
    this.setState({[event.target.name]: event.target.value})
  },

  isValid () {
    const { errors, isValid } = validateInput(this.state)

    if (!isValid) {
      this.setState({ errors: errors })
    }

    return isValid
  },

  onSubmit (event) {
    event.preventDefault()

    if (this.isValid()) {
      this.setState({errors: {}, isLoading: true})
      this.props.userSignupRequest(this.state)
        .then(response => {
          this.setState({isLoading: false})
        })
        .catch(error => {
          this.setState({errors: error.response.data, isLoading: false})
        })
    }
  },

  render () {
    const { errors } = this.state
    return (
      <div className='row'>
        <h1 className='text-center'>Sign up to make some polls!</h1>
        <div className='col-md-4 col-md-offset-4'>

          <form onSubmit={this.onSubmit}>

            <TextFieldGroup
              value={this.state.username}
              onChange={this.onChange}
              type='text'
              name='username'
              label='Username'
              error={errors.username}
            />

            <TextFieldGroup
              value={this.state.email}
              onChange={this.onChange}
              type='text'
              name='email'
              label='Email'
              error={errors.email}
            />

            <TextFieldGroup
              value={this.state.password}
              onChange={this.onChange}
              type='password'
              name='password'
              label='Password'
              error={errors.password}
            />

            <TextFieldGroup
              value={this.state.passwordConfirmation}
              onChange={this.onChange}
              type='password'
              name='passwordConfirmation'
              label='Confirm Password'
              error={errors.passwordConfirmation}
            />

            <div className='form-group'>
              <button disabled={this.state.isLoading} className='btn btn-primary btn-lg'>
                Sign up
              </button>
            </div>
          </form>

        </div>
      </div>
    )
  }
})

module.exports = connector(Signup)
