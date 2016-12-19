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
const checkVoterUniqueness = async function (pollID, voter) {
  console.log('inside checkVoterUniqueness')
  return Poll.findOne({ _id: pollID })
  .exec()
  .then(poll => {
    const dupeCheck = dupeVoterCheck(poll, voter)
    console.log('dupeCheck', dupeCheck)
    return dupeCheck
  })
  .catch(err => {
    console.error('ERROR checkVoterUniqueness', err)
  })
}

/**
 * params: selectedOption number, pollID string, voter string
 * 
 * Adds a new vote to a poll document. Returns an object
 * with the updated document and updated votes tally, or 
 * error if unsuccessful.
 *
 * returns: Object
 */
const updateDocumentWithNewVote = function (selectedOption, pollID, voter) {
  const votesPath = `options.${selectedOption}.votes`
  return Poll.findOneAndUpdate(
      { _id: pollID },
      { $addToSet: { [votesPath]: { 'voter': voter } } },
      { new: true, upsert: true }
    )
    .then(updatedDoc => {
      // res.json({ 'vote cast': updatedDoc })
      let voteTotal = tallyVoteTotal(updatedDoc)
      return { updated: true, totalVotes: voteTotal, doc: updatedDoc }
    })
    .catch(err => {
      console.error('ERROR updateDocumentWithNewVote', err)
      return { updated: false, error: err }
    })
}

const updateDocumentVotesTotal = function (pollID, totalVotes) {
  return Poll.findOneAndUpdate(
    { _id: pollID },
    { $set: { totalVotes } },
    { new: true }
  )
  .then(updatedDoc => {
    return { updated: true, doc: updatedDoc }
  })
  .catch(err => {
    console.error('ERROR updateDocumentVotesTotal', err)
    return { updated: false, error: err}
  })
}

module.exports = { checkVoterUniqueness, updateDocumentWithNewVote, updateDocumentVotesTotal }
