const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  title: String,
  options: [{
    option: String,
    votes: [{
      voter: String
    }]
  }],
  totalVotes: Number,
  owner: String
}, { timestamps: true })

const Poll = mongoose.model('Polls', schema)

module.exports = Poll
