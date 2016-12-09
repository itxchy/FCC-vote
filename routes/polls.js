const express = require('express')
const isEmpty = require('lodash/isEmpty')
const Polls = require('../models/Polls')
const authenticate = require('../server/middleware/authenticate')
const commonValidations = require('./shared/createAPollValidation')
let router = express.Router()

function validateNewPoll(data, otherValidations) {
  // Ugly hack to rename keys so they can be validated by createAPollValidation
  const validatorData = {
    newPollTitle: data.title,
    newPollOptions: data.options
  }
  let { errors } = otherValidations(validatorData)

  // Checks if a poll of the same title exists already
  // Each poll title must be unique
  return Polls.query({
    where:{ title: data.title }
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
  .catch(err => console.error('duplicate poll check error', error))
}

/**
 * Saves a new poll to the database if it passes 
 * validation
 */
router.post('/', authenticate, (req, res) => {

  validateNewPoll(req.body, commonValidations)
    .then((result) => {
      if (result.isValid) {
        let { title, options, owner } = req.body
        const total_votes = 0
        /**
         * Poll options will be stored in the database as a JSON string.
         * [  
         *   { 
         *     "option": "Popular choice indeed",
         *     "votes": 0
         *   },
         *   { 
         *     "option": "More controversial, but fun choice."
         *     "votes": 0
         *   }
         * ]
         */
        const formattedOptions = options.map(option => {
          return {
            option,
            votes: 0
          }
        })

        options = JSON.stringify(formattedOptions)

        Polls.forge({
          title, options, total_votes, owner
        }, { hasTimestamps: true })
        .save()
        .then(poll => res.json({success: true}))
        .catch(err => {
          console.log(err)
          return res.status(500).json({error: err})
        })

      } else {
        console.log('ERROR!!', result.errors)
        res.status(400).json(result.errors)
      }
    })
    .catch(err => console.error('save new poll error', error))
})

/**
 * Updates a poll with a new vote
 */
router.put('/:id', (req, res) => {
  console.log('vote request body', req.body)
  const pollID = req.params.id
  const selectedOption = req.body.selectedOption
  // if voter is null, use the user's IP address instead
  const voter = req.body.voter
  Polls.query({
    select: ['id', 'options', 'total_votes'],
    where: { id: pollID }
  })
  .fetch()
  .then(poll => {


    console.log('poll to update with vote: ', poll)
    res.json(poll)
  })
  .catch(err => console.error('update poll error', error))
})


/**
 * Retrieves all polls
 */
router.get('/', (req, res) => {
  Polls.query({
    select: ['id', 'title', 'options', 'total_votes', 'owner']
  })
  .fetchAll()
  .then(polls => {
    res.json(polls)
  })
  .catch(err => handleError(err))
})

/**
 * Retrieves all of a user's polls
 */
router.get('/:user', (req, res) => {
  Polls.query({
    select: ['id', 'title', 'options', 'total_votes', 'owner'],
    where: { owner: req.params.user }
  })
  .fetchAll()
  .then(polls => {
    res.json(polls)
  })
  .catch(err => handleError(err))
})

module.exports = router
