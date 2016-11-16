const React = require('react')
const { connector } = require('../../redux/Store')
const classnames = require('classnames')
const validateInput = require('../../routes/shared/signupValidation')
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
          console.log('response: ', response)
          this.setState({isLoading: false})
        })
        .catch(error => {
          console.log('caught error: ', error)
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

            <div className={classnames('form-group', {'has-error': errors.username})}>
              <label className='control-label'>Username</label>
              <input
                value={this.state.username}
                onChange={this.onChange}
                type='text'
                name='username'
                className='form-control'
              />
              {errors.username &&
                <span className='help-block'>
                  {errors.username}
                </span>
              }
            </div>

            <div className={classnames('form-group', {'has-error': errors.email})}>
              <label className='control-label'>Email</label>
              <input
                value={this.state.email}
                onChange={this.onChange}
                type='text'
                name='email'
                className='form-control'
              />
              {errors.email &&
                <span className='help-block'>
                  {errors.email}
                </span>
              }
            </div>

            <div className={classnames('form-group', {'has-error': errors.password})}>
              <label className='control-label'>Password</label>
              <input
                value={this.state.password}
                onChange={this.onChange}
                type='password'
                name='password'
                className='form-control'
              />
              {errors.password &&
                <span className='help-block'>
                  {errors.password}
                </span>
              }
            </div>

            <div className={classnames('form-group', {'has-error': errors.passwordConfirmation})}>
              <label className='control-label'>Confirm Password</label>
              <input
                value={this.state.passwordConfirmation}
                onChange={this.onChange}
                type='password'
                name='passwordConfirmation'
                className='form-control'
              />
              {errors.passwordConfirmation &&
                <span className='help-block'>
                  {errors.passwordConfirmation}
                </span>
              }
            </div>

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
