'use strict';

var has = require('lodash/has');
var isEmpty = require('lodash/isEmpty');
var flatten = require('lodash/flatten');
/**
 * Params: poll object, voter string
 *
 * Checks if the current voter has already voted on the
 * current poll
 *
 * returns: BOOL
 */
var dupeVoterCheck = function dupeVoterCheck(poll, voter) {
  if (!voter) {
    return null;
  }
  var dupeCheck = poll.options.map(function (option) {
    if (!isEmpty(option.votes)) {
      var individualVoteCheck = option.votes.map(function (vote) {
        if (vote.voter === voter) {
          return true;
        } else {
          return;
        }
      });
      return individualVoteCheck;
    } else {
      return false;
    }
  });
  // if the bool 'true' is included in the dupCheck array,
  // dupePollCheck will return true, otherwise false
  dupeCheck = flatten(dupeCheck).includes(true);
  return dupeCheck;
};

/**
 * Params: client's request object, client's ip address
 *
 * Assigns voter as the signed-in user, or IP address
 * of a user who is not signed in
 *
 * returns: username, IP address, or false
 */
var getVoterIdentity = function getVoterIdentity(req, ip) {
  var voter = void 0;
  if (has(req, 'body.voter') && req.body.voter) {
    voter = req.body.voter;
  } else if (ip) {
    voter = ip;
  } else {
    voter = false;
  }
  return voter;
};

var tallyVoteTotal = function tallyVoteTotal(updatedDoc) {
  return updatedDoc.options.map(function (option) {
    return option.votes.length;
  }).reduce(function (prev, next) {
    return prev + next;
  }, 0);
};

module.exports = { getVoterIdentity: getVoterIdentity, dupeVoterCheck: dupeVoterCheck, tallyVoteTotal: tallyVoteTotal };