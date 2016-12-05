const express = require('express')
const isEmpty = require('lodash/isEmpty')
const Polls = require('../models/Polls')
const commonValidations = require('./shared/createAPollValidation')
let router = express.Router()


function validateNewPoll(data, otherValidations) {
  // Ugly hack to rename keys so they can be validated by createAPollValidation
  const validatorData = {
    newPollTitle: data.title,
    newPollOptions: data.options
  }
  let { errors } = otherValidations(validatorData)
  return Polls.query({
    where:{ title: data.title }
  }).fetch().then(poll => {
    if (poll) {
      errors.title = 'Another poll has the same title'
    }
    return {
      errors,
      isValid: isEmpty(errors)
    }
  })
}

router.post('/', (req, res) => {

  validateNewPoll(req.body, commonValidations)
    .then((result) => {
      if (result.isValid) {
        console.log('req.body', req.body)
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
        }, { hasTimestamps: true }).save()
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
})

router.get('/:owner', (req, res) => {
  console.log('req.body')
})

module.exports = router
