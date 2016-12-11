const mongoose = require('mongoose')

const Schema = new mongoose.Schema({
  username: String,
  email: String,
  password_digest: String,
  createdAt: Date,
  updatedAt: Date
})
