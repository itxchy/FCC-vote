'use strict';

/* global describe it expect */

var _require = require('./pollsLib'),
    getVoterIdentity = _require.getVoterIdentity,
    dupeVoterCheck = _require.dupeVoterCheck,
    tallyVoteTotal = _require.tallyVoteTotal;

var poll = {
  id: '5851f8e4dd751518580d57ca',
  updatedAt: '2016-12-15T03:04:23.213Z',
  createdAt: '2016-12-15T01:59:00.487Z',
  owner: 'IllestToTheGillest',
  totalVotes: 0,
  title: 'Why oh why?',
  __v: 0,
  options: [{
    option: 'Don\'t know',
    _id: '5851f8e4dd751518580d57cd',
    votes: [{ _id: '585203e894610424affd0042', voter: 'Matt' }, { _id: '585208373b22b529bdde32ba', voter: 'damon' }]
  }, { option: 'Because',
    _id: '5851f8e4dd751518580d57cc',
    votes: [{ _id: '585205883b22b529bdde3855', voter: 'rey' }]
  }, { option: 'Why Not?',
    _id: '5851f8e4dd751518580d57cb',
    votes: [] }]
};

describe('pollLib', function () {
  describe('getVoterIdentity()', function () {
    it('should return req.body.voter if it exists', function () {
      var requestObj = { body: { voter: 'Mr. Smith' } };
      var ip = '1.0.0.1';
      var voter = getVoterIdentity(requestObj, ip);
      expect(voter).toBe('Mr. Smith');
    });
    it('should return ip if req.body.voter exists, but is null', function () {
      var requestObj = { body: { voter: null } };
      var ip = '1.0.0.1';
      var voter = getVoterIdentity(requestObj, ip);
      expect(voter).toBe('1.0.0.1');
    });
    it('should return an ip address if req.body.voter is falsy', function () {
      var requestObj = null;
      var ip = '1.0.0.1';
      var voter = getVoterIdentity(requestObj, ip);
      expect(voter).toBe('1.0.0.1');
    });
    it('should return false if both req.body.voter and ip are falsy', function () {
      var requestObj = null;
      var ip = null;
      var voter = getVoterIdentity(requestObj, ip);
      expect(voter).toBe(false);
    });
  });
  describe('dupeVoterCheck()', function () {
    it('should return true if vote is a duplicate', function () {
      var voter = 'damon';
      var dupeCheck = dupeVoterCheck(poll, voter);
      expect(dupeCheck).toBe(true);
    });
    it('should return false if vote is unique', function () {
      var voter = 'Justine';
      var dupeCheck = dupeVoterCheck(poll, voter);
      expect(dupeCheck).toBe(false);
    });
    it('should return null if voter is undefined', function () {
      var voter = null;
      var dupeCheck = dupeVoterCheck(poll, voter);
      expect(dupeCheck).toBe(null);
    });
  });
  describe('tallyVoteTotal()', function () {
    it('should count all votes', function () {
      var voteTotal = tallyVoteTotal(poll);
      expect(voteTotal).toBe(3);
    });
  });
});