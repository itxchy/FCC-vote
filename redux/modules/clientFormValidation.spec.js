import clientFormValidationReducer from './clientFormValidation'
import {
  DEFAULT_STATE,
  dupeUserCheckResults,
  newFormErrors,
  checkUserInResponse
} from './clientFormValidation'

describe('redux: clientFormValidation', () => {
  it('should return state when no state is given', () => {
    const state = clientFormValidationReducer(undefined, {})
    expect(state).toEqual(DEFAULT_STATE)
  })

  describe('dupeUserCheckResults', () => {
    it('should set state.errors and state.invalid', () => {
      const state = clientFormValidationReducer(DEFAULT_STATE, dupeUserCheckResults({}, false))
      expect(state.errors).toEqual({})
      expect(state.invalid).toEqual(false)
    })
    it('should set an state.errors with an error, and state.invalid to true', () => {
      const state = clientFormValidationReducer(DEFAULT_STATE, dupeUserCheckResults({ username: 'username taken' }, true))
      expect(state.errors.username).toEqual('username taken')
      expect(state.invalid).toEqual(true)
    
    })
  })

  describe('newFormErrors', () => {
    it('should set state.errors with new errors while keeping existing errors', () => {
      const state = clientFormValidationReducer(DEFAULT_STATE, newFormErrors({}, { username: 'username taken' }))
      const state2 = clientFormValidationReducer(state, newFormErrors(state.errors, { email: 'email invalid' }))
      expect(state2.errors).toEqual({ username: 'username taken', email: 'email invalid' })
    })
  })

  describe('checkUserInResponse', () => {
    it('should return username error if username is taken', () => {
      const res = { data: { user: '2Chainz' } }
      const field = 'username'
      const identifier = null
      const results = checkUserInResponse(res, field, identifier)
      expect(results.errors.username).toEqual('A user exists with this username')
      expect(results.invalid).toEqual(true)
    })
    it('should return no errors, and invalid as false if username is unique', () => {
      const res = { data: {} }
      const field = 'username'
      const identifier = null
      const results = checkUserInResponse(res, field, identifier)
      expect(results.errors.username).toEqual(null)
      expect(results.invalid).toEqual(false)
    })
    it('should return email error if email address is taken', () => {
      const res = { data: { user: '2Chainz' } }
      const field = 'email'
      const identifier = '2Chainz@Truniversity.com'
      const results = checkUserInResponse(res, field, identifier)
      expect(results.errors.email).toEqual('A user exists with this email')
      expect(results.invalid).toEqual(true)    
    });
    it('should return email error if email is invalid', () => {
      const res = { data: {} }
      const field = 'email'
      const identifier = '2Chainz@@'
      const results = checkUserInResponse(res, field, identifier)
      expect(results.errors.email).toEqual('This email address is invalid')
      expect(results.invalid).toEqual(true)
    })
    it('should return no errors and invalid as false if email is valid', () => {
      const res = { data: {} }
      const field = 'email'
      const identifier = '2Chainz@Truniversity.com'
      const results = checkUserInResponse(res, field, identifier)
      expect(results.errors).toEqual({ email: null })
      expect(results.invalid).toEqual(false)    
    });
  })
})

