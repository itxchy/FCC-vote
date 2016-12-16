/**
 * Params: 
 *
 * Checks if the current voter has already voted on the 
 * 
 *
 * returns: BOOL
 */
const dupeVoterCheck = function (poll, voter) {
  let dupeCheck = poll.options.map(option => {
    let individualVoteCheck = option.votes.map(vote => {
      if (vote.voter === voter) {
        return true
      } else {
        return
      }
    })
    return individualVoteCheck
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
  if (req.body.voter) {
    voter = req.body.voter
  } else if (ip) {
    voter = ip
  } else {
    voter = false
  }
  return voter
}

module.exports = { getVoterIdentity, dupeVoterCheck }
