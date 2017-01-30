import React from 'react'
import ReactDOM from 'react-dom'
import App from './ClientApp'
import '../sass/main.scss'
import 'jquery'
require('d3')
import '../sass/bootstrap-sass/assets/javascripts/bootstrap.js'

ReactDOM.render(<App />, document.getElementById('app'))
