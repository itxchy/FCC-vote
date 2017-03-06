const async = require('asyncawait/async')
const awaitFake = require('asyncawait/await')
const Poll = require('../../models/Poll')
const { dupeVoterCheck, tallyVoteTotal } = require('./pollsLib')
const { log } = require('../../server.js')

/**
 * params: pollID string, voter string
 *
 * Queries the database to check if the current voter
 * has voted already.
 *
 * returns: BOOL
 */
const checkVoterUniqueness = async(function (pollID, voter) {
  return Poll.findOne({ _id: pollID })
  .exec()
  .then(poll => {
    const dupeCheck = awaitFake(dupeVoterCheck(poll, voter))
    return dupeCheck
  })
  .catch(err => {
    log.error('pollsDb.js: checkVoterUniqueness', { mongoose: true }, { err })
  })
})

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
      log.error('pollsDb.js: updateDocumentWithNewVote', { mongoose: true }, { err })
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
    log.error('pollsDb.js: updateDocumentVotesTotal', { mongoose: true }, { err })
    return { updated: false, error: err }
  })
}

const updatePollDocumentOnEdit = function (pollID, pollData) {
  const { title, options } = pollData
  const formattedOptions = options.map(option => {
    return {
      option,
      votes: []
    }
  })
  return Poll.findOneAndUpdate(
    { _id: pollID },
    { $set: { title, options: formattedOptions, totalVotes: 0 } }
  )
  .then(updatedDoc => {
    return { updatedDoc }
  })
  .catch(error => {
    log.error('pollsDb.js: updatePollDocumentOnEdit', { mongoose: true }, { err })
    return { error }
  })
}

module.exports = { checkVoterUniqueness, updateDocumentWithNewVote, updateDocumentVotesTotal, updatePollDocumentOnEdit }
