const React = require('react')
const { connector } = require('../../redux/Store')
const validateInput = require('../../routes/shared/signupValidation')
const TextFieldGroup = require('../common/TextFieldGroup')
const { func, object } = React.PropTypes

const Signup = React.createClass({
  propTypes: {
    userSignupRequest: func.isRequired,
    addFlashMessage: func.isRequired,
    isUserExists: func.isRequired
  },

  getInitialState () {
    return {
      username: '',
      email: '',
      password: '',
      passwordConfirmation: '',
      errors: {},
      isLoading: false,
      invalid: false
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

  checkUserExists (event) {
    const field = event.target.name
    const val = event.target.value
    if (val !== '') {
      this.props.isUserExists(val).then(res => {
        // if a user is found, pass an error message
        let errors = this.state.errors
        let invalid
        if (res.data.user) {
          errors[field] = 'A user exists with this ' + field
          invalid = true
        } else {
          errors[field] = ''
          invalid = false
        }

        this.setState({errors, invalid})
      })
    }
  },

  onSubmit (event) {
    event.preventDefault()

    if (this.isValid()) {
      this.setState({errors: {}, isLoading: true})

      this.props.userSignupRequest(this.state)
        .then(response => {
          this.props.addFlashMessage({
            type: 'success',
            text: 'Signup successful!'
          })
          this.context.router.push('/')
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
              checkUserExists={this.checkUserExists}
              type='text'
              field='username'
              label='Username'
              error={errors.username}
            />

            <TextFieldGroup
              value={this.state.email}
              onChange={this.onChange}
              checkUserExists={this.checkUserExists}
              type='text'
              field='email'
              label='Email'
              error={errors.email}
            />

            <TextFieldGroup
              value={this.state.password}
              onChange={this.onChange}
              type='password'
              field='password'
              label='Password'
              error={errors.password}
            />

            <TextFieldGroup
              value={this.state.passwordConfirmation}
              onChange={this.onChange}
              type='password'
              field='passwordConfirmation'
              label='Confirm Password'
              error={errors.passwordConfirmation}
            />

            <div className='form-group'>
              <button disabled={this.state.isLoading || this.state.invalid} className='btn btn-primary btn-lg'>
                Sign up
              </button>
            </div>
          </form>

        </div>
      </div>
    )
  }
})

Signup.contextTypes = {
  router: object.isRequired
}

module.exports = connector(Signup)
