const React = require('react')
const { connector } = require('../../redux/Store')

const Signup = React.createClass({
  render () {
    return (
      <div className='row'>
        <h1 className='text-center'>Sign up to make some polls!</h1>
        <div className='col-md-4 col-md-offset-4'>

          <form>

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

        </div>
      </div>
    )
  }
})

module.exports = connector(Signup)
