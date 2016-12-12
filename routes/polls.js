/* eslint camelcase: 0 */

const express = require('express')
const isEmpty = require('lodash/isEmpty')
const Poll = require('../models/Poll')
const authenticate = require('../server/middleware/authenticate')
const commonValidations = require('./shared/createAPollValidation')
let router = express.Router()

function validateNewPoll (data, otherValidations) {
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
      if (poll) {
        errors.title = 'Another poll has the same title'
      }
      return {
        errors,
        isValid: isEmpty(errors)
      }
    })
    .catch(err => res.status(500).json({ 'duplicate poll check error': err }))

  /*Polls.query({
    where: { title: data.title }
  })
  .fetch()
  .then(poll => {
    if (poll) {
      errors.title = 'Another poll has the same title'
    }
    return {
      errors,
      isValid: isEmpty(errors)
    }
  })
  .catch(err => console.error('duplicate poll check error', err))*/
}

/**
 * Saves a new poll to the database if it passes
 * validation
 */
router.post('/', authenticate, (req, res) => {
  validateNewPoll(req.body, commonValidations)
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
        .then(() => {
          res.json({ success: 'new poll created!', poll: poll })
        })
        .catch(err => res.status(500).json({ 'new poll DB save error': err }))

        /*Polls.forge({
          title, options, total_votes, owner
        }, { hasTimestamps: true })
        .save()
        .then(poll => res.json({success: true}))
        .catch(err => {
          console.log(err)
          return res.status(500).json({error: err})
        })*/
      } else {
        console.log('ERROR!!', result.errors)
        res.status(400).json({ 'poll validation error': result.errors })
      }
    })
    .catch(err => res.status(500).json({ 'Poll validation promise rejected': error }))
})

/**
 * Updates a poll with a new vote
 */
router.put('/:id', (req, res) => {
  console.log('vote request body', req.body)
  const pollID = req.params.id
  const selectedOption = req.body.selectedOption
  const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress
  let voter = null
  // if voter is null, use the user's IP address instead
  if (req.body.voter) {
    voter = req.body.voter
  } else if (ip) {
    voter = ip
  } else {
    voter = false
    console.error('ERROR: no voter or IP found while updating poll!')
  }

  const pollUpdateObj = {
    selectedOption,
    ip,
    voter
  }

  console.log('Poll update object:', pollUpdateObj)

  res.json({'update poll request success': pollUpdateObj })
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
  .catch(err => console.error('update poll error', error))*/
})

/**
 * Retrieves all polls
 */
router.get('/', (req, res) => {
  Poll.find()
    .select('_id title options total_votes owner')
    .exec()
    .then(polls => {
      return res.json(polls)
    })
    .catch(err => res.status(500).json({ 'error retrieving all polls': err }))
/*  Polls.query({
    select: ['id', 'title', 'options', 'total_votes', 'owner']
  })
  .fetchAll()
  .then(polls => {
    res.json(polls)
  })
  .catch(err => console.error('Retrieve all polls error', error))
*/
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
/*  Polls.query({
    select: ['id', 'title', 'options', 'total_votes', 'owner'],
    where: { owner: req.params.user }
  })
  .fetchAll()
  .then(polls => {
    res.json(polls)
  })
  .catch(err => console.error('update user polls error', error))*/
})

module.exports = router
