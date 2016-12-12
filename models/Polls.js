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

const Polls = mongoose.model('Polls', schema)

module.exports = Polls
