const express = require('express')
const isEmpty = require('lodash/isEmpty')
const async = require('asyncawait/async')
const awaitFake = require('asyncawait/await')
const Poll = require('../models/Poll')
const authenticate = require('../middleware/authenticate')
const commonValidations = require('./shared/createAPollValidation')
const { getVoterIdentity } = require('./lib/pollsLib')
const {
  checkVoterUniqueness,
  updateDocumentWithNewVote,
  updateDocumentVotesTotal,
  updatePollDocumentOnEdit } = require('./lib/pollsDb')
let router = express.Router()
const { log } = require('../../server.js')

function validateNewPoll (res, data, commonValidations) {
  // Ugly hack to rename keys so they can be validated by createAPollValidation
  const validatorData = {
    newPollTitle: data.title,
    newPollOptions: data.options
  }

  let { errors } = commonValidations(validatorData)

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
    .catch(err => {
      log.error('polls.js: duplicate poll check failed', { mongoose: true, err })
      res.status(500).json({ 'duplicate poll check error': err })
    })
}

function validateUpdatedPoll (res, data, commonValidations) {
  const validatorData = {
    newPollTitle: data.title,
    newPollOptions: data.options
  }
  let { errors, isValid } = commonValidations(validatorData)
  return { errors, isValid }
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
        log.info('polls.js: new poll created', { poll })
        res.json({ success: 'new poll created!', poll: poll })
      })
      .catch(err => {
        log.error('polls.js: new poll creation failed', { mongoose: true, err })
        res.status(500).json({ 'new poll DB save error': err })
      })
    } else {
      res.status(400).json({ 'poll validation error': result.errors })
    }
  })
  .catch(err => res.status(500).json({ 'Poll validation promise rejected': err }))
})

/**
 *  Edits a poll
 */
router.put('/edit/:id', authenticate, (req, res) => {
  const validate = validateUpdatedPoll(res, req.body, commonValidations)
  if (!validate.isValid) {
    return res.status(400).json({ 'bad request': 'bad data for poll edit', errors: validate.errors })
  }

  const applyPollEdits = async(function applyPollEdits (req, res) {
    try {
      let updatedPoll = awaitFake(updatePollDocumentOnEdit(req.params.id, req.body))
      console.log('edit: updatedPoll:', updatedPoll)
      if (updatedPoll.updatedDoc) {
        return res.json(updatedPoll.updatedDoc)
      }
      if (updatedPoll.error) {
        return res.status(500).json({'poll edit failed in database operation': updatedPoll.error})
      }
    } catch (error) {
      console.error(error)
      return res.status(500).json({'poll edit failed': error})
    }
  })

  applyPollEdits(req, res)
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

  /**
   * Adds a new unique vote to the relevent poll document in MongoDB. Duplicate voters are rejected.
   * Returns the updated poll document from MongoDB, along with the new totalVotes value
   */
  const addNewVoteToPoll = async(function addNewVoteToPoll (req, res) {
    try {
      // check if voter has already voted
      let dupeCheck = awaitFake(checkVoterUniqueness(pollID, voter))
      if (dupeCheck) {
        return res.status(400).json({
          'bad request': 'user or IP can only vote once per poll',
          dupeVoter: true
        })
      }
      // add new vote to current poll
      let updatedPoll = { updated: false, totalVotes: null, doc: null }
      updatedPoll = awaitFake(updateDocumentWithNewVote(selectedOption, pollID, voter))
      if (!updatedPoll.updated) {
        return res.status(500).json({
          error: 'Failed to update poll with a valid new vote',
          details: updatedPoll.error
        })
      }
      // add new vote total to poll
      let updatedTotalVotes = awaitFake(updateDocumentVotesTotal(pollID, updatedPoll.totalVotes))
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
  })

  addNewVoteToPoll(req, res)
})

/**
 * Retrieves all polls
 */
router.get('/', (req, res) => {
  Poll.find()
    .sort({ createdAt: -1 })
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

/**
 * Retrieves a single poll based on poll ID
 */
router.get('/id/:id', (req, res) => {
  Poll.find({ _id: req.params.id })
    .select('_id title options totalVotes owner')
    .exec()
    .then(poll => {
      console.log('single poll returned:', JSON.stringify(poll))
      return res.json(poll)
    })
    .catch(err => res.status(500).json({ 'error retrieveing single poll': err }))
})

/**
 * Deletes a poll forever based on ID
 */
router.delete('/delete/:id', (req, res) => {
  Poll.find({ _id: req.params.id })
    .remove()
    .exec()
    .then(poll => {
      poll.hasOwnProperty('result')
      console.log('poll deleted:', JSON.stringify(poll))
      return res.json(poll)
    })
    .catch(err => res.status(500).json({'error deleting poll': err}))
})

module.exports = router
