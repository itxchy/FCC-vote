const Poll = require('../../models/Poll')
const { dupeVoterCheck, tallyVoteTotal } = require('./pollsLib')

/**
 * params: pollID string, voter string
 * 
 * Queries the database to check if the current voter
 * has voted already.
 *
 * returns: BOOL
 */
const checkVoterUniqueness = function (pollID, voter) {
  return Poll.findOne({ _id: pollID })
  .exec()
  .then(poll => {
    const dupeCheck = dupeVoterCheck(poll, voter)
    return dupeCheck
  })
}

/**
 * params: pollID string, voter string
 * 
 * Adds a new vote to a poll document. Returns an object
 * with the updated document and updated votes tally, or 
 * error if unsuccessful.
 *
 * returns: Object
 */
const updateDocumentWithNewVote = function (pollID, voter) {
  const votesPath = `options.${selectedOption}.votes`
  return Poll.findOneAndUpdate(
      { _id: pollID },
      { $addToSet: { [votesPath]: { 'voter': voter } } },
      { new: true, upsert: true }
    )
    .then(updatedDoc => {
      res.json({ 'vote cast': updatedDoc })
      let voteTotal = tallyVoteTotal(updatedDoc)
      return { updated: true, totalVotes: voteTotal, doc: updatedDoc }
    })
    .catch(err => {
      return { updated: false, error: err }
    })
}

const updateDocumentVotesTotal = function (totalVotes) {
  return Poll.findOneAndUpdate({

  })
}

module.exports = { checkVoterUniqueness, updateDocumentWithNewVote }
