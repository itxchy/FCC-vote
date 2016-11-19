const express = require('express')
const validateInput = require('./shared/signupValidation.js')

let router = express.Router()

router.post('/', (req, res) => {
  const { errors, isValid } = validateInput(req.body)

  if (isValid) {
    return res.json({ success: true })
  } else {
    res.status(400).json(errors)
  }

})

module.exports = router
