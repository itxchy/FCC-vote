const axios = require('axios')

function setAuthorizationToken (token) {
  if (token) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
    console.log('auth header set!', token)
  } else {
    console.log('deleted!!!!')
    delete axios.defaults.headers.common['Authorization']
  }
}
module.exports = setAuthorizationToken
