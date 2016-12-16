const mongoose = require('mongoose')

const Schema = new mongoose.Schema({
  username: String,
  email: String,
  passwordDigest: String,
}, { timestamps: true })

const User = mongoose.model('User', Schema)

module.exports = User