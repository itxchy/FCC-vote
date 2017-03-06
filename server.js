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
const _ = require('lodash')
const mongoose = require('mongoose')
mongoose.Promise = require('bluebird')

const React = require('react')
const ReactDOMServer = require('react-dom/server')
const { match, RouterContext, createMemoryHistory } = require('react-router')
const { Provider } = require('react-redux')
// const { store } = require('./redux/Store.js')
const { store } = process.env.NODE_ENV === 'production' ? require('./production/redux/Store.js') : require('./redux/Store.js')
const baseTemplate = fs.readFileSync('./index.html')
const template = _.template(baseTemplate)
// const ClientApp = require('./components/ClientApp.jsx')
// const ClientApp = require('./production/components/ClientApp.js')

// const { Routes } = require('./components/Routes.jsx')
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
      console.log('Connected to Mongoose! production environment')
    })
    .catch(err => {
      console.error('Mongoose production connection failed', err)
    })
} else {
  mongoose.connect('mongodb://localhost:27017/vote')
  .then(() => {
    console.log('Connected to Mongoose! development environment')
  })
  .catch(err => {
    console.error('Mongoose development connection failed:', err)
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

app.use('/public', expressStaticGzip('./public'))

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
  const basename = '/'
  const location = req.url.replace(basename, '')
  const history = createMemoryHistory({ entries: [location], basename })
  match({ routes: Routes(), location, history }, (error, redirectLocation, renderProps) => {
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
      res.status(404).send('404: Page Not Found')
    }
  })
})

console.log(`Listening on port ${port}...`)
app.listen(port)
