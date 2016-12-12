const jwt = require('jsonwebtoken')
const config = require('../../config')
const User = require('../../models/User')
const isEmpty = require('lodash/isEmpty')

function authenticate (req, res, next) {
  const authorizationHeader = req.headers['authorization']
  let token

  if (authorizationHeader) {
    token = authorizationHeader.split(' ')[1]
  }

  if (token) {
    jwt.verify(token, config.jwtSecret, (err, decoded) => {
      if (err) {
        res.status(401).json({ error: 'Failed to authenticate' })
      } else {
        console.log('decoded', decoded)
        console.log('decoded.id', decoded.id)
        User.find({ _id: decoded.id })
        .select('email _id username')
        .exec()
        .then(user => {
          console.log('user found:', user)
          if(isEmpty(user)) {
            return res.status(404).json({ error: 'No such user' })
          }
          req.currentUser = user
          next()
        })
/*        User().query({
          where: { id: decoded.id },
          select: [ 'email', 'id', 'username' ]
        })
        .fetch()
        .then(user => {
          if (!user) {
            res.status(404).json({ error: 'No such user' })
          }
          req.currentUser = user
          next()
        })*/
      }
    })
  } else {
    res.status(403).json({ error: 'No token provided' })
  }
}

module.exports = authenticate
