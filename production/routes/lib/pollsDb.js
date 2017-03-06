'use strict';

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var async = require('asyncawait/async');
var awaitFake = require('asyncawait/await');
var Poll = require('../../models/Poll');

var _require = require('./pollsLib'),
    dupeVoterCheck = _require.dupeVoterCheck,
    tallyVoteTotal = _require.tallyVoteTotal;

/**
 * params: pollID string, voter string
 *
 * Queries the database to check if the current voter
 * has voted already.
 *
 * returns: BOOL
 */


var checkVoterUniqueness = async(function (pollID, voter) {
  return Poll.findOne({ _id: pollID }).exec().then(function (poll) {
    var dupeCheck = awaitFake(dupeVoterCheck(poll, voter));
    return dupeCheck;
  }).catch(function (err) {
    console.error('ERROR checkVoterUniqueness', err);
  });
});

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
    // res.json({ 'vote cast': updatedDoc })
    var voteTotal = tallyVoteTotal(updatedDoc);
    return { updated: true, totalVotes: voteTotal, doc: updatedDoc };
  }).catch(function (err) {
    console.error('ERROR updateDocumentWithNewVote', err);
    return { updated: false, error: err };
  });
};

var updateDocumentVotesTotal = function updateDocumentVotesTotal(pollID, totalVotes) {
  return Poll.findOneAndUpdate({ _id: pollID }, { $set: { totalVotes: totalVotes } }, { new: true }).then(function (updatedDoc) {
    return { updated: true, doc: updatedDoc };
  }).catch(function (err) {
    console.error('ERROR updateDocumentVotesTotal', err);
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
    return { updatedDoc: updatedDoc };
  }).catch(function (error) {
    return { error: error };
  });
};

module.exports = { checkVoterUniqueness: checkVoterUniqueness, updateDocumentWithNewVote: updateDocumentWithNewVote, updateDocumentVotesTotal: updateDocumentVotesTotal, updatePollDocumentOnEdit: updatePollDocumentOnEdit };