const express = require('express')
const validateInput = require('./shared/signupValidation.js')

let router = express.Router()

router.post('/', (req, res) => {
  console.log('req.body: ', req.body)
  const { errors, isValid } = validateInput(req.body)
  console.log('errors: ', errors)
  console.log('isValid: ', isValid)
  if (isValid) {
    res.json({ success: true })
  } else {
    res.status(400).json(errors)
  }

})

module.exports = router
