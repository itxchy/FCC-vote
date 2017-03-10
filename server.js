if (process.env.NODE_ENV !== 'production') {
  require('babel-register')({ ignore: /node_modules/ })
}
require('module-alias').addAliases({
  'react': 'preact-compat',
  'react-dom': 'preact-compat'
})

const express = require('express')
const expressStaticGzip = require('express-static-gzip')
const bodyParser = require('body-parser')
const fs = require('fs')
const _template = require('lodash/template')
const mongoose = require('mongoose')
mongoose.Promise = require('bluebird')
const helmet = require('helmet')
const bunyan = require('bunyan')
const log = bunyan.createLogger({
  name: 'vote',
  streams: [
    {
      level: 'info',
      stream: process.stdout
    },
    {
      level: 'warn',
      path: 'log/vote-error.log'
    }
  ]})
exports.log = log

const React = require('react')
const ReactDOMServer = require('react-dom/server')
const { match, RouterContext } = require('react-router')
const { Provider } = require('react-redux')
const { store } = process.env.NODE_ENV === 'production' ? require('./production/redux/Store.js') : require('./redux/Store.js')
const baseTemplate = fs.readFileSync('./index.html')
const template = _template(baseTemplate)

const { Routes } = process.env.NODE_ENV === 'production' ? require('./production/components/Routes.js') : require('./components/Routes.jsx')
const users = require('./routes/users.js')
const auth = require('./routes/auth.js')
const polls = require('./routes/polls.js')

const port = process.env.PORT || 4000
const app = express()

/**
 * connect to MongoDB
 */
if (process.env.NODE_ENV === 'production') {
  mongoose.connect(process.env.MONGO_URI)
    .then(() => {
      log.info('Mongoose: Connected! production environment')
    })
    .catch(err => {
      log.fatal('Mongoose: production connection failed', { mongoose: true, err })
    })
} else {
  mongoose.connect('mongodb://localhost:27017/vote')
  .then(() => {
    log.info('Mongoose: Connected! development environment')
  })
  .catch(err => {
    log.fatal('Mongoose development connection failed:', { mongoose: true, err })
  })
}

// middleware
app.use(helmet())
app.use(bodyParser.json())

/**
 * Routes
 */
app.use('/api/users', users)
app.use('/api/auth', auth)
app.use('/api/polls', polls)

if (process.env.NODE_ENV === 'production') {
  app.use('/public', expressStaticGzip('./public'))
} else {
  app.use('/public', express.static('./public'))
}

/**
 * Server-side rendering for React
 *
 * React Router will first attempt to match a requested URL.
 * If a match is found, the app will be rendered to a string
 * and passed down to the browser with the proper router context.
 * If a match finds an error, a redirectLocation value, or simply
 * "misses", the relevent case gets handled.
 */
app.use((req, res) => {
  match({ routes: Routes(), location: req.url }, (err, redirectLocation, renderProps) => {
    if (err) {
      res.status(500).send(err.message)
      log.error('React Router: match error', { reactRouter: true, err })
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
      res.status(404).send('404: Page Not Found')
    }
  })
})

log.info(`Express: Listening on port ${port}...`)
app.listen(port)
