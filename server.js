require('babel-register')
const express = require('express')
const bodyParser = require('body-parser')
const fs = require('fs')
const _ = require('lodash')
const mongoose = require('mongoose')
mongoose.Promise = require('bluebird')

const React = require('react')
const ReactDOMServer = require('react-dom/server')
const { match, RouterContext } = require('react-router')
const { Provider } = require('react-redux')
const { store } = require('./redux/Store.js')
const baseTemplate = fs.readFileSync('./index.html')
const template = _.template(baseTemplate)
const ClientApp = require('./components/ClientApp.jsx')

const { Routes } = require('./components/Routes.jsx')
const users = require('./routes/users.js')
const auth = require('./routes/auth.js')
const polls = require('./routes/polls.js')

const port = process.env.PORT || 4000
const app = express()

/**
 * connect to MongoDB
 */
if (process.env.NODE_ENV === 'production') {
  console.log('production environment. No remote mongodb server specified.')
  // connect to remote database
} else {
  mongoose.connect('mongodb://localhost:27017/vote')
  .then(() => {
    console.log('Connected to Mongoose!')
  })
  .catch(err => {
    console.err('Mongoose connection failed:', err)
  })
}

// middleware
app.use(bodyParser.json())

/**
 * Routes
 */
app.use('/api/users', users)
app.use('/api/auth', auth)
app.use('/api/polls', polls)

app.use('/public', express.static('./public'))

/**
 * Server-side rendering for React
 *
 * React Router will first attempt to match a requested URL.
 * If a match is found, the app will be rendered to a string
 * and passed down to the browser with the proper router context.
 * If a match finds an error, a redirectLocation value, or simply
 * "misses", the relevent case gets handled.
 */
 console.log('routes():', Routes)
app.use((req, res) => {
  match({ routes: Routes(), location: req.url }, (error, redirectLocation, renderProps) => {
    if (error) {
      res.status(500).send(error.message)
    } else if (redirectLocation) {
      res.redirect(302, redirectLocation.pathname + redirectLocation.search)
    } else if (renderProps) {
      const body = ReactDOMServer.renderToString(
        React.createElement(
          Provider, { store }, React.createElement(RouterContext, renderProps)
        )
      )
      res.status(200).send(template({ body }))
    } else {
      res.status(404).send('Not Found')
    }
  })
})

console.log(`Listening on port ${port}...`)
app.listen(port)
