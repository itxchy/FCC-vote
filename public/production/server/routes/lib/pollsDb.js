'use strict';

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Poll = require('../../models/Poll');

var _require = require('./pollsLib'),
    dupeVoterCheck = _require.dupeVoterCheck,
    tallyVoteTotal = _require.tallyVoteTotal;

var _require2 = require('../../../server.js'),
    log = _require2.log;

/**
 * params: pollID string, voter string
 *
 * Queries the database to check if the current voter
 * has voted already.
 *
 * returns: BOOL
 */


var checkVoterUniqueness = function checkVoterUniqueness(pollID, voter) {
  return Poll.findOne({ _id: pollID }).exec().then(function (poll) {
    var dupeCheck = dupeVoterCheck(poll, voter);
    log.info('pollsDb.js: dupeVoterCheck result', { dupeCheck: dupeCheck });
    return dupeCheck;
  }).catch(function (err) {
    log.error('pollsDb.js: checkVoterUniqueness', { mongoose: true }, { err: err });
  });
};

/**
 * params: selectedOption number, pollID string, voter string
 *
 * Adds a new vote to a poll document. Returns an object
 * with the updated document and updated votes tally, or
 * error if unsuccessful.
 *
 * returns: Object
 */
var updateDocumentWithNewVote = function updateDocumentWithNewVote(selectedOption, pollID, voter) {
  var votesPath = 'options.' + selectedOption + '.votes';
  return Poll.findOneAndUpdate({ _id: pollID }, { $addToSet: _defineProperty({}, votesPath, { 'voter': voter }) }, { new: true, upsert: true }).then(function (updatedDoc) {
    var voteTotal = tallyVoteTotal(updatedDoc);
    log.info('pollsDb.js: updated document with new vote', { updatedDoc: updatedDoc }, { voteTotal: voteTotal });
    return { updated: true, totalVotes: voteTotal, doc: updatedDoc };
  }).catch(function (err) {
    log.error('pollsDb.js: updateDocumentWithNewVote', { mongoose: true }, { err: err });
    return { updated: false, error: err };
  });
};

var updateDocumentVotesTotal = function updateDocumentVotesTotal(pollID, totalVotes) {
  return Poll.findOneAndUpdate({ _id: pollID }, { $set: { totalVotes: totalVotes } }, { new: true }).then(function (updatedDoc) {
    return { updated: true, doc: updatedDoc };
  }).catch(function (err) {
    log.error('pollsDb.js: updateDocumentVotesTotal', { mongoose: true }, { err: err });
    return { updated: false, error: err };
  });
};

var updatePollDocumentOnEdit = function updatePollDocumentOnEdit(pollID, pollData) {
  var title = pollData.title,
      options = pollData.options;

  var formattedOptions = options.map(function (option) {
    return {
      option: option,
      votes: []
    };
  });
  return Poll.findOneAndUpdate({ _id: pollID }, { $set: { title: title, options: formattedOptions, totalVotes: 0 } }).then(function (updatedDoc) {
    log.info('pollDb.js: updated poll document for edit', { updatedDoc: updatedDoc });
    return { updatedDoc: updatedDoc };
  }).catch(function (err) {
    log.error('pollsDb.js: updatePollDocumentOnEdit', { mongoose: true }, { err: err });
    return { err: err };
  });
};

module.exports = { checkVoterUniqueness: checkVoterUniqueness, updateDocumentWithNewVote: updateDocumentWithNewVote, updateDocumentVotesTotal: updateDocumentVotesTotal, updatePollDocumentOnEdit: updatePollDocumentOnEdit };