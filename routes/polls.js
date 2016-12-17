const express = require('express')
const isEmpty = require('lodash/isEmpty')
const Promise = require('bluebird')
const Poll = require('../models/Poll')
const authenticate = require('../server/middleware/authenticate')
const commonValidations = require('./shared/createAPollValidation')
const { dupeVoterCheck, getVoterIdentity } = require('./lib/pollsLib')
let router = express.Router()

function validateNewPoll (res, data, otherValidations) {
  // Ugly hack to rename keys so they can be validated by createAPollValidation
  const validatorData = {
    newPollTitle: data.title,
    newPollOptions: data.options
  }
  let { errors } = otherValidations(validatorData)

  // Checks if a poll of the same title exists already
  // Each poll title must be unique
  return Poll.find({ title: data.title })
    .exec()
    .then(poll => {
      console.log('vadidating... poll found:', poll)
      if (!isEmpty(poll)) {
        errors.title = 'Another poll has the same title'
      }
      return {
        errors,
        isValid: isEmpty(errors)
      }
    })
    .catch(err => res.status(500).json({ 'duplicate poll check error': err }))
}

/**
 * Saves a new poll to the database if it passes
 * validation
 */
router.post('/', authenticate, (req, res) => {
  validateNewPoll(res, req.body, commonValidations)
  .then((result) => {
    if (result.isValid) {
      const poll = new Poll()
      let { title, options, owner } = req.body
      const formattedOptions = options.map(option => {
        return {
          option,
          votes: []
        }
      })
      poll.title = title
      poll.options = formattedOptions
      poll.totalVotes = 0
      poll.owner = owner

      console.log('poll to be saved:', poll)

      poll.save()
      .then(poll => {
        res.json({ success: 'new poll created!', poll: poll })
      })
      .catch(err => res.status(500).json({ 'new poll DB save error': err }))
    } else {
      console.log('ERROR!!', result.errors)
      res.status(400).json({ 'poll validation error': result.errors })
    }
  })
  .catch(err => res.status(500).json({ 'Poll validation promise rejected': err }))
})

/**
 * Updates a poll with a new vote
 */
router.put('/:id', (req, res) => {
  // console.log('vote request body', req.body)
  const pollID = req.params.id
  const selectedOption = req.body.selectedOption
  const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress
  let voter = getVoterIdentity(req, ip)
  if (!voter) {
    // console.error('ERROR: no voter or IP found while updating poll!')
    return res.status(400).json({error: ''})
  }
  Poll.findOne({ _id: pollID })
  .exec()
  .then(poll => {
    console.log('POLL:', poll.options[0].votes)
    console.log('VOTER:', voter)
    const dupeCheck = dupeVoterCheck(poll, voter)
    return dupeCheck
  })
  .then((dupeCheck) => {
    if (!dupeCheck) {
      const votesPath = `options.${selectedOption}.votes`
      Poll.findOneAndUpdate(
        { _id: pollID },
        { $addToSet: { [votesPath]: { 'voter': voter } } },
        { new: true, upsert: true }
      )
      .then(updatedDoc => {
        return res.json({ 'vote cast': updatedDoc })
      })
      .catch(err => res.status(500).json({ 'error': 'vote update failed', 'details': err }))
    }
  })
  .catch(err => res.status(400).json({ 'bad request': 'user or IP can only vote once per poll', 'error': err }))

  // TODO get total votes

// ******* NOT WORKING *******
  /*  Poll.findOne({ _id: pollID })
  .exec()
  .then(poll => {
    let currentVotes = poll.options[selectedOption].votes
    console.log('currentVotes', currentVotes)
    // check if the current vote is a duplicate
    let dupeVote = currentVotes.filter(vote => {
      console.log('vote.voter:', vote.voter, 'voter:', voter)
      return vote.voter === voter
    })
    console.log('dupeVote', dupeVote)
    if (!isEmpty(dupeVote)) {
      return res.status(400).json({ denied: 'only one vote per user or IP address'})
    }

    // push new vote to the votes array in selected option
    poll.options[selectedOption].votes.push({ voter })

    // update total votes count by counting the length of each votes array
    poll.totalVotes = poll.options.map(option => {
      return option.votes.length
    })
    .reduce((prev, next) => {
      return prev + next
    }, 0)

    console.log('new vote:', poll.options[selectedOption])

    poll.save()
    .then(poll => {
      console.log('saved poll:', poll)
      return res.json({ success: 'vote counted' })
    })
    .catch(err => console.error('poll save error:', err))

    console.log('currentVotes:', currentVotes)

    currentVotes.push(voter)
  })
  .catch(err => console.error('poll query error', err)) */
  // TODO query the exact poll.options[selectedOption].votes.push({voter: newVoter})

  // console.log('Poll update object:', pollUpdateObj)

  // return res.json({'update poll request success': pollUpdateObj })
  /*  if (voter) {
    Poll.findOne({ _id: pollID })
    .update({})
  }
  */
  /*  Polls.query({
    select: ['id', 'options', 'total_votes'],
    where: { id: pollID }
  })
  .fetch()
  .then(poll => {

    console.log('poll to update with vote: ', poll)
    res.json(poll)
  })
  .catch(err => console.error('update poll error', error)) */
})

/**
 * Retrieves all polls
 */
router.get('/', (req, res) => {
  Poll.find()
    .select('_id title options totalVotes owner')
    .exec()
    .then(polls => {
      return res.json(polls)
    })
    .catch(err => res.status(500).json({ 'error retrieving all polls': err }))
})

/**
 * Retrieves all of a user's polls
 */
router.get('/:user', (req, res) => {
  Poll.find({ owner: req.params.user })
    .select('_id title options total_votes owner')
    .exec()
    .then(polls => {
      return res.json(polls)
    })
    .catch(err => res.status(500).json({ 'error retrieving current user\'s polls': err }))
})

module.exports = router
