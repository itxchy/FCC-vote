require('babel-register')

const express = require('express')
const bodyParser = require('body-parser')
const React = require('react')
const ReactDOMServer = require('react-dom/server')
const { match, RouterContext } = require('react-router')
const { Provider } = require('react-redux')
const { store } = require('./redux/Store.jsx')
const _ = require('lodash')
const fs = require('fs')
const port = process.env.PORT || 4000
const baseTemplate = fs.readFileSync('./index.html')
const template = _.template(baseTemplate)
const ClientApp = require('./components/ClientApp.jsx')
const Routes = ClientApp.Routes
const users = require('./routes/users.js')
const auth = require('./routes/auth.js')

const app = express()

app.use(bodyParser.json())

app.use('/api/users', users)
app.use('/api/auth', auth)

app.use('/public', express.static('./public'))

app.use((req, res) => {
  match({ routes: Routes(), location: req.url }, (error, redirectLocation, renderProps) => {
    if (error) {
      res.status(500).send(error.message)

    } else if (redirectLocation) {
      res.redirect(302, redirectLocation.pathname + redirectLocation.search)

    } else if (renderProps) {
      const body = ReactDOMServer.renderToString(
        React.createElement(Provider, { store },
          React.createElement(RouterContext, renderProps)
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
