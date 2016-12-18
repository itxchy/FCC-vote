/* global describe xdescribe it expect */

const { getVoterIdentity, dupeVoterCheck, tallyVotesTotal } = require('./pollsLib')

const poll = { 
  id: '5851f8e4dd751518580d57ca',
  updatedAt: '2016-12-15T03:04:23.213Z',
  createdAt: '2016-12-15T01:59:00.487Z',
  owner: 'IllestToTheGillest',
  totalVotes: 0,
  title: 'Why oh why?',
  __v: 0,
  options: [ 
    { 
      option: 'Don\'t know',
      _id: '5851f8e4dd751518580d57cd',
      votes: [
        { _id: '585203e894610424affd0042', voter: 'Matt' }, 
        { _id: '585208373b22b529bdde32ba', voter: 'damon' }
      ] 
    },
    { option: 'Because',
      _id: '5851f8e4dd751518580d57cc',
      votes: [
        { _id: '585205883b22b529bdde3855', voter: 'rey' }
      ] 
    },
    { option: 'Why Not?',
      _id: '5851f8e4dd751518580d57cb',
      votes: [] } 
  ] 
}    

describe('pollLib', () => {
  describe('getVoterIdentity()', () => {
    it('should return req.body.voter if it exists', () => {
      const requestObj = { body: { voter: 'Mr. Smith' } }
      const ip = '1.0.0.1'
      const voter = getVoterIdentity(requestObj, ip)
      expect(voter).toBe('Mr. Smith')
    })
    it('should return ip if req.body.voter exists, but is null', () => {
      const requestObj = { body: { voter: null } }
      const ip = '1.0.0.1'
      const voter = getVoterIdentity(requestObj, ip)
      expect(voter).toBe('1.0.0.1')
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
  describe('dupeVoterCheck()', () => {
    it('should return true if vote is a duplicate', () => {
      const voter = 'damon'
      const dupeCheck = dupeVoterCheck(poll, voter)
      expect(dupeCheck).toBe(true)
    })
    it('should return false if vote is unique', () => {
      const voter = 'Justine'
      const dupeCheck = dupeVoterCheck(poll, voter)
      expect(dupeCheck).toBe(false)
    })
    it('should return null if voter is undefined', () => {
      const voter = null
      const dupeCheck = dupeVoterCheck(poll, voter)
      expect(dupeCheck).toBe(null)
    })
  })
  describe('tallyVotesTotal()', () => {
    it('should update the ')
  })
})
