const { getVoterIdentity, dupeVoterCheck } = require('./pollsLib')

describe('pollLib', () => {
  describe('getVoterIdentity()', () => {
    it('should return req.body.voter if it exists', () => {
      const requestObj = { body: { voter: 'Mr. Smith' } }
      const ip = '1.0.0.1'
      const voter = getVoterIdentity(requestObj, ip)
      expect(voter).toBe('Mr. Smith')
    })
    it('should return an ip address if req.body.voter is falsy', () => {
      const requestObj = null
      const ip = '1.0.0.1'
      const voter = getVoterIdentity(requestObj, ip)
      expect(voter).toBe('1.0.0.1')      
    })
    it('should return false if both req.body.voter and ip are falsy', () => {
      const requestObj = null
      const ip = null
      const voter = getVoterIdentity(requestObj, ip)
      expect(voter).toBe(false)      
    })    
  })
  xdescribe('dupeVoterCheck()', () => {

  })
})