const has = require('lodash/has')
const isEmpty = require('lodash/isEmpty')
const flatten = require('lodash/flatten')
/**
 * Params: poll object, voter string
 *
 * Checks if the current voter has already voted on the
 * current poll
 *
 * returns: BOOL
 */
const dupeVoterCheck = function (poll, voter) {
  if (!voter) {
    return null
  }
  let dupeCheck = poll.options.map(option => {
    if (!isEmpty(option.votes)) {
      let individualVoteCheck = option.votes.map(vote => {
        if (vote.voter === voter) {
          return true
        } else {
          return
        }
      })
      return individualVoteCheck
    } else {
      return false
    }
  })
  // if the bool 'true' is included in the dupCheck array,
  // dupePollCheck will return true, otherwise false
  dupeCheck = flatten(dupeCheck).includes(true)
  return dupeCheck
}

/**
 * Params: client's request object, client's ip address
 *
 * Assigns voter as the signed-in user, or IP address
 * of a user who is not signed in
 *
 * returns: username, IP address, or false
 */
const getVoterIdentity = function (req, ip) {
  let voter
  if (has(req, 'body.voter') && req.body.voter) {
    voter = req.body.voter
  } else if (ip) {
    voter = ip
  } else {
    voter = false
  }
  return voter
}

const tallyVoteTotal = function (updatedDoc) {
  return updatedDoc.options
    .map(option => {
      return option.votes.length
    })
    .reduce((prev, next) => {
      return prev + next
    }, 0)
}

module.exports = { getVoterIdentity, dupeVoterCheck, tallyVoteTotal }
