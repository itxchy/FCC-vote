const React = require('react')
const { connector } = require('../../redux/Store')

const Signup = React.createClass({
  render () {
    return (
      <form>
        <h1>Sign up to make some polls!</h1>
        <div className='form-group'>
          <label className='control-label'>Username</label>
          <input
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
    )
  }
})

module.exports = connector(Signup)
