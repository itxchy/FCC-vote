const mongoose = require('mongoose')

const votesSchema = new mongoose.Schema({
  voter: String
})
// TODO combine votesSchema in options schema
const optionsSchema = new mongoose.Schema({
  option: String,
  votes: [votesSchema]
})

const voteSchema = new mongoose.Schema({
  title: String,
  options: [optionsSchema],
  totalVotes: Number,
  owner: String
}, { timestamps: true })

const Poll = mongoose.model('Polls', voteSchema)

module.exports = Poll
