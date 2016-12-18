const Poll = require('../../models/Poll')
const { dupeVoterCheck } = require('./pollsLib')

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

const updateDocumentWithNewVote = function (pollID, votesPath, voter) {
  return Poll.findOneAndUpdate(
      { _id: pollID },
      { $addToSet: { [votesPath]: { 'voter': voter } } },
      { new: true, upsert: true }
    )
    .then(updatedDoc => {
      res.json({ 'vote cast': updatedDoc })
      let voteTotal = tallyVoteTotal(updatedDoc)
      return updated = { updated: true, totalVotes: voteTotal, doc: updated }
    })
    .catch(err => {
      res.status(500).json({ 'error': 'vote update failed', 'details': err })

    })
}

module.exports = { checkVoterUniqueness }