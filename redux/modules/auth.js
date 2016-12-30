export SET_CURRENT_USER = 'setCurrentUser'

export function login (data) {
  return axios.post('/api/auth', data).then(res => {
    const token = res.data.token
    localStorage.setItem('jwtToken', token)
    setAuthorizationToken(token)
    const user = jwt.decode(token)
    return { type: SET_CURRENT_USER, user }
  })
}
export function logout () {
  localStorage.removeItem('jwtToken')
  setAuthorizationToken(false)
  return { type: SET_CURRENT_USER, user: {} }
}

export reduceSetCurrentUser = (state, action) => {
  const newState = {}
  console.log('action.user', action.user)
  let authenticationStatus = false
  if (action.user && !isEmpty(action.user)) {
    authenticationStatus = true
  }
  Object.assign(newState, state, {
    isAuthenticated: authenticationStatus,
    user: action.user
  })
  return newState
}
