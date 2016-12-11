const mongoose = require('mongoose')

const Schema = new mongoose.Schema({
  username: String,
  email: String,
  password_digest: String,
}, { timestamps: true })

const User = mongoose.model('User', Schema)

module.exports = User