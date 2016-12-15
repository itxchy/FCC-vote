const dupePollCheck = function (poll, voter) {
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

module.exports = { getVoterIdentity, dupePollCheck }