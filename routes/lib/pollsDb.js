const Poll = require('../models/Poll')
const { dupeVoterCheck } = require('./lib/pollsLib')

// check if the current vote is a duplicate
const checkVoterUniqueness = function (pollID, poll, voter) {
  return Poll.findOne({ _id: pollID })
  .exec()
  .then(poll => {
    const dupeCheck = dupeVoterCheck(poll, voter)
    return dupeCheck
  })
}