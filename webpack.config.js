const webpack = require('webpack')
const path = require('path')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
// const BrowserSyncPlugin = require('browser-sync-webpack-plugin')
const validate = require('webpack-validator')

const config = {
  context: __dirname,
  entry: './components/BrowserEntry.jsx',
  output: {
    path: path.join(__dirname, '/public'),
    filename: 'bundle.js'
  },
  resolve: {
    extensions: ['.js', '.jsx', '.json']
  },
  node: {
    net: 'empty',
    dns: 'empty'
  },
  stats: {
    colors: true,
    reasons: true,
    chunks: false
  },
  module: {
    // preLoaders: [
    //   {
    //     test: /\.jsx?$/,
    //     loader: 'eslint-loader',
    //     exclude: /node_modules/
    //   }
    // ],
    rules: [
      {
        test: /\.jsx?$/,
        loader: 'babel-loader?sourceMap',
        exclude: /node_modules/
      },
      {
        test: /\.json$/,
        loader: 'json-loader'
      },
      {
        test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'url-loader?limit=10000&minetype=application/font-woff&name=fonts/[name].[ext]'
      },
      {
        test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'file-loader?name=fonts/[name].[ext]'
      },
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader'
          use: ['css-loader','sass-loader']
        })
      }
    ]
  },
  debug: true,
  devtool: 'source-map',
  plugins: [
    new ExtractTextPlugin('/css/style.css'),
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      'window.jQuery': 'jquery',
      'window.d3': 'd3',
      'window.topojson': 'topojson',
      'd3': 'd3'
    })
/*    ,
    new BrowserSyncPlugin({
      host: 'localhost',
      port: 3000,
      server: { baseDir: [''] }
    })*/
  ]
}

module.exports = validate(config)
