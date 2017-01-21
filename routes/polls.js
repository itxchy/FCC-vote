const express = require('express')
const isEmpty = require('lodash/isEmpty')
const Poll = require('../models/Poll')
const authenticate = require('../server/middleware/authenticate')
const commonValidations = require('./shared/createAPollValidation')
const { getVoterIdentity } = require('./lib/pollsLib')
const { checkVoterUniqueness, updateDocumentWithNewVote, updateDocumentVotesTotal } = require('./lib/pollsDb')
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

      poll.save()
      .then(poll => {
        res.json({ success: 'new poll created!', poll: poll })
      })
      .catch(err => res.status(500).json({ 'new poll DB save error': err }))
    } else {
      res.status(400).json({ 'poll validation error': result.errors })
    }
  })
  .catch(err => res.status(500).json({ 'Poll validation promise rejected': err }))
})

/**
 * Updates a poll with a new vote
 */
router.put('/:id', (req, res) => {
  const pollID = req.params.id
  const selectedOption = req.body.selectedOption
  const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress
  let voter = getVoterIdentity(req, ip)

  if (!voter) {
    return res.status(400).json({error: 'no voter or IP found while updating poll'})
  }

  addNewVoteToPoll(req, res)
  /**
   * Adds a new unique vote to the relevent poll document in MongoDB. Duplicate voters are rejected.
   * Returns the updated poll document from MongoDB, along with the new totalVotes value
   */
  async function addNewVoteToPoll (req, res) {
    try {
      // check if voter has already voted
      let dupeCheck = await checkVoterUniqueness(pollID, voter)
      if (dupeCheck) {
        return res.status(400).json({ 
          'bad request': 'user or IP can only vote once per poll',
          dupeVoter: true
        })
      }
      // add new vote to current poll
      let updatedPoll = { updated: false, totalVotes: null, doc: null }
      updatedPoll = await updateDocumentWithNewVote(selectedOption, pollID, voter)
      if (!updatedPoll.updated) {
        return res.status(500).json({
          error: 'Failed to update poll with a valid new vote', 
          details: updatedPoll.error
        })
      }
      // add new vote total to poll
      let updatedTotalVotes = await updateDocumentVotesTotal(pollID, updatedPoll.totalVotes)
      if (!updatedTotalVotes.updated) {
        return res.status(500).json({
          error: 'Failed to update total votes tally',
          details: updatedTotalVotes.error })
      }
      console.log('updatedTotalVotes.doc', updatedTotalVotes.doc)
      return res.json({ 
        success: 'new vote and new total votes tally saved', 
        poll: updatedPoll.doc, 
        totalVotes: updatedTotalVotes.doc,
        dupeVote: false
      })
    } catch (error) {
      console.error('caught ERROR', error)
      return res.status(500).json({ error: 'Failed to add new vote to the current poll\'s document' })
    }
  }
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
    .select('_id title options totalVotes owner')
    .exec()
    .then(polls => {
      return res.json(polls)
    })
    .catch(err => res.status(500).json({ 'error retrieving current user\'s polls': err }))
})

module.exports = router
