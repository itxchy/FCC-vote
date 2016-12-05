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
    .then((errors, isValid) => {

      if (isValid) {
        let { title, options } = req.body
        const total_votes = 0
        options = JSON.stringify(options)
        console.log(options)

        Polls.forge({
          title, options, total_votes
        }, { hasTimestamps: true }).save()
          .then(poll => res.json({success: true}))
          .catch(err => res.status(500).json({error: err}))

      } else {
        res.status(400).json(errors)
      }
    })
})

module.exports = router
