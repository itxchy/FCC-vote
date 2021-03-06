import React from 'react'
import { connect } from 'react-redux'
import TextFieldGroup from '../common/TextFieldGroup'
import validateInput from '../../server/routes/shared/loginValidation'
const { func, object, bool, shape } = React.PropTypes
import { login } from '../../redux/modules/auth'

const LoginForm = React.createClass({
  propTypes: {
    dispatchLogin: func.isRequired,
    user: shape({
      isAuthenticated: bool,
      user: object,
      errors: object,
      userLoading: bool
    })
  },
  getInitialState () {
    return {
      identifier: '',
      password: '',
      errors: {
        identifier: null,
        passwords: null
      }
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
      this.setState({ errors: {} })
      this.props.dispatchLogin(this.state)
    }
  },

  onChange (event) {
    this.setState({ [event.target.name]: event.target.value })
  },

  componentWillReceiveProps (nextProps) {
    if (nextProps.user.isAuthenticated) {
      this.context.router.push('/')
    }
  },

  componentWillMount () {
    if (this.props.user.isAuthenticated) {
      this.context.router.push('/')
    }
  },

  render () {
    let loginErrors = { form: null, server: null }
    if (this.props.user.errors) {
      loginErrors = this.props.user.errors
    }
    const { errors, identifier, password } = this.state

    return (
      <form onSubmit={this.onSubmit}>
        <h1>Login</h1>

        { loginErrors.form && <div className='alert alert-danger'>{loginErrors.form}</div> }
        { loginErrors.server && <div className='alert alert-danger'>{loginErrors.server}</div> }

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
          <button className='button btn btn-primary btn-lg' disabled={this.props.user.userLoading}>Login</button>
        </div>

      </form>
    )
  }
})

LoginForm.contextTypes = {
  router: object.isRequired
}

const mapStateToProps = (state) => {
  return {
    user: state.user
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    dispatchLogin (credentials) {
      dispatch(login(credentials))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm)
