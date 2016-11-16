const React = require('react')
const { connector } = require('../../redux/Store')

const Signup = React.createClass({
  getInitialState () {
    return {
      username: ''
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

  onSubmit (event) {
    event.preventDefault()
    console.log(`form submitted! ${this.state}`)
  },

  render () {
    return (
      <div className='row'>
        <h1 className='text-center'>Sign up to make some polls!</h1>
        <div className='col-md-4 col-md-offset-4'>

          <form onSubmit={this.onSubmit}>
            <div className='form-group'>
              <label className='control-label'>Username</label>
              <input
                value={this.state.username}
                onChange={this.onChange}
                type='text'
                name='username'
                className='form-control'
              />
            </div>

            <div className='form-group'>
              <button className='btn btn-primary btn-lg'>
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
