import React from 'react'
import { connect } from 'react-redux'
import validateInput from '../../routes/shared/signupValidation'
import TextFieldGroup from '../common/TextFieldGroup'
const { func, object } = React.PropTypes
import { userSignupRequest } from '../../redux/modules/userSignupRequest'
import { addFlashMessage } from '../../redux/modules/flashMessage'
import { dupeUserCheck, newFormErrors } from '../../redux/modules/clientFormValidation'

const Signup = React.createClass({
  propTypes: {
    dispatchUserSignupRequest: func.isRequired,
    dispatchAddFlashMessage: func.isRequired,
    dispatchDupeUserCheck: func.isRequired,
    dispatchNewFormErrors: func.isRequired,
    errors: object
  },

  getInitialState () {
    return {
      username: '',
      email: '',
      password: '',
      passwordConfirmation: '',
      isLoading: false,
      invalid: false
    }
  },

  onChange (event) {
    this.setState({[event.target.name]: event.target.value})
  },

  isValid () {
    const { errors, isValid } = validateInput(this.state)
    if (!isValid) {
      this.props.dispatchNewFormErrors(this.props.errors, errors)
    }
    return isValid
  },

  ensureUserExists (event) {
    // +TODO: make sure clientFormValidation isn't dispatched a second time
    // with the name identifier error in redux
    const field = event.target.name
    const val = event.target.value
    console.log('ensureUserExists event data:', '\nfield:', field, '\nval', val)
    if (val !== '' && val !== this.props.errors.username) {
      this.props.dispatchDupeUserCheck(val, field, this.props.errors)
    }
    if (val === '') {
      this.props.dispatchNewFormErrors(this.props.errors, {
        [field]: `A valid ${[field]} is required`
      })
    }
  },

  onSubmit (event) {
    event.preventDefault()

    if (this.isValid()) {
      this.props.dispatchNewFormErrors(this.props.errors, {})
      this.setState({ isLoading: true })
      this.props.dispatchUserSignupRequest(this.state)
      // TODO: then is not going to work here
        .then(response => {
          this.props.dispatchAddFlashMessage({
            type: 'success',
            text: 'Signup successful!'
          })
          this.context.router.push('/')
        })
        .catch(error => {
          this.props.dispatchNewFormErrors(this.props.errors, error.response.data)
          this.setState({ isLoading: false })
        })
    }
  },

  render () {
    // TODO move errors from component state to redux state.
    // TODO validate sameness of password field onBlur of confirm password
    // TODO validate username to ensure it's not an email
    const { errors } = this.props
    return (
      <div className='row'>
        <h1 className='text-center'>Sign up to make some polls!</h1>
        <div className='col-md-4 col-md-offset-4'>

          <form onSubmit={this.onSubmit}>

            <TextFieldGroup
              value={this.state.username}
              onChange={this.onChange}
              onBlur={this.ensureUserExists}
              type='text'
              field='username'
              label='Username'
              error={errors.username}
            />

            <TextFieldGroup
              value={this.state.email}
              onChange={this.onChange}
              onBlur={this.ensureUserExists}
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

const mapStateToProps = (state) => {
  return {
    user: state.user,
    errors: {
      username: state.clientFormValidation.errors.username,
      email: state.clientFormValidation.errors.email
    },
    invalid: state.invalid
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    dispatchUserSignupRequest (state) {
      dispatch(userSignupRequest(state))
    },
    dispatchAddFlashMessage (messageObj) {
      dispatch(addFlashMessage(messageObj))
    },
    dispatchDupeUserCheck (val, field, validationErrors) {
      dispatch(dupeUserCheck(val, field, validationErrors))
    },
    dispatchNewFormErrors (currentErrors, newErrors) {
      dispatch(newFormErrors(currentErrors, newErrors))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Signup)
