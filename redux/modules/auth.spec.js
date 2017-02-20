import userReducerSlice from './auth'
import {
  DEFAULT_STATE,
  setCurrentUser,
  userLoading,
  setErrors,
  setClientIp,
  handleLoginResponse,
  prepareUserFromToken
} from './auth.js'
import configureStore from 'redux-mock-store'
const middlewares = []
const mockStore = configureStore(middlewares)

describe('redux: user', () => {
  it('if the state parameter passed to the user root reducer slice is falsy, DEFAULT_STATE should be returned', () => {
    let state = userReducerSlice(undefined, {})
    console.log('test state Default:', state)
    expect(state).toEqual(DEFAULT_STATE)
  })

  describe('setCurrentUser', () => {
    const mockUser = { id: '12341234asdfasdf', username: 'PollKilla', iat: '1324567894'}
    let stateWithValidUser = userReducerSlice(DEFAULT_STATE, setCurrentUser(mockUser))
    it('should set state.user as the user object passed to setCurrentUser', () => {
      expect(stateWithValidUser.user).toBe(mockUser)
    })
    it('should set state.isAuthenticated to true if user object is valid', () => {
      expect(stateWithValidUser.isAuthenticated).toBe(true)
    })
    it('should set state.userLoading to false whether user object is valid or not', () => {
      expect(stateWithValidUser.userLoading).toBe(false)
    })
    it('should set state.isAuthenticated to false if user object is invalid', () => {
      let stateWithInvalidUser = userReducerSlice(DEFAULT_STATE, setCurrentUser({ error: 'bad news' }))
      expect(stateWithInvalidUser.isAuthenticated).toBe(false)
    })
  })

  describe('userLoading', () => {
    it('should set state.userLoading as the boolean passed to userLoading', () => {
      let state = userReducerSlice(DEFAULT_STATE, userLoading(true))
      expect(state.userLoading).toBe(true)
    })
    it('should keep state.userLoading as false if the parameter passed is not a boolean', () => {
      let state = userReducerSlice(DEFAULT_STATE, userLoading('wat'))
      expect(state.userLoading).toBe(false)
    })
  })

  describe('setErrors', () => {
    it('should set state.errors as the object passed to setErrors', () => {
      let state = userReducerSlice(DEFAULT_STATE, setErrors({ form: 'Invalid Credentials' }))
      expect(state.errors.form).toBe('Invalid Credentials')
    })
    it('should simply pass the new unchanged state along if setErrors\'s parameter is not an object', () => {
      let state = userReducerSlice(DEFAULT_STATE, setErrors(42))
      expect(state.errors).toBe(null)
    })    
    // it('should call console.error if an unknown error key is passed with the error object, but still set the unknown error', () => {
    //   global.console = { error: jest.fn() }
    //   let state = userReducerSlice(DEFAULT_STATE, setErrors({ wat: 'is this really an error?' }))
    //   expect(console.error).toBeCalled()
    //   expect(state.errors.wat).toBe('is this really an error?')
    // })
  })

  describe('setClientIp', () => {
    it('should set state.clientIp as the string passed to setClientIp', () => {
      let state = userReducerSlice(DEFAULT_STATE, setClientIp('100.000.000.000'))
      expect(state.clientIp).toBe('100.000.000.000')
    })
  })

  describe('handleLoginResponse', () => {
    const prepareUserFromToken = jest.fn().mockReturnValue({ id: '12341234asdfasdf', username: 'PollKilla', iat: '1324567894'})
    it('should set form errors with setErrors if res.data.errors is present', () => {
      const initialState = {}
      const store = mockStore(initialState)
      handleLoginResponse({data: { errors: 'err0r' }}, store.dispatch, prepareUserFromToken)
      const actions = store.getActions()

      expect(actions[0].type).toEqual('SET_ERRORS')
      expect(actions[0].errors).toEqual('err0r')
    })
    it('should dispatch setCurrentUser with user object and userLoading(false) if proper token is received', () => {
      const prepareUserFromToken = jest.fn(() => ({ id: '12341234asdfasdf', username: 'PollKilla', iat: '1324567894' }))
      const initialState = {}
      const store = mockStore(initialState)
      handleLoginResponse({data: { token: true }}, store.dispatch, prepareUserFromToken)
      const actions = store.getActions()

      expect(actions[0].type).toEqual('SET_CURRENT_USER')
      expect(actions[0].user).toEqual({ id: '12341234asdfasdf', username: 'PollKilla', iat: '1324567894'})
      expect(actions[1].type).toEqual('USER_LOADING')
      expect(actions[1].userLoading).toEqual(false)
    })
    it('should dispatch setErrors with a server error if res.data is not defined', () => {
      const initialState = {}
      const store = mockStore(initialState)
      handleLoginResponse({}, store.dispatch, prepareUserFromToken)
      const actions = store.getActions()

      expect(actions[0].type).toEqual('USER_LOADING')
      expect(actions[0].userLoading).toEqual(false)
      expect(actions[1].type).toEqual('SET_ERRORS')
      expect(actions[1].errors).toEqual({'server': 'Server Error. Bad response.'})
    })
  })
})