const jwt = require('jsonwebtoken')
const config = process.env.NODE_ENV === 'production' ? process.env.JWT_SECRET : require('../../config').jwtSecret
const User = require('../../models/User')
const isEmpty = require('lodash/isEmpty')

function authenticate (req, res, next) {
  const authorizationHeader = req.headers['authorization']
  let token

  if (authorizationHeader) {
    token = authorizationHeader.split(' ')[1]
  }

  if (token) {
    jwt.verify(token, config, (err, decoded) => {
      if (err) {
        res.status(401).json({ error: 'Failed to authenticate' })
      } else {
        User.find({ _id: decoded.id })
        .select('email _id username')
        .exec()
        .then(user => {
          if (isEmpty(user)) {
            return res.status(404).json({ error: 'No such user' })
          }
          req.currentUser = user
          next()
        })
      }
    })
  } else {
    res.status(403).json({ error: 'No token provided' })
  }
}

module.exports = authenticate
