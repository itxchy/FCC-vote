const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  title: String,
  options: [{
    option: String,
    votes: [{
      voter: String
    }]
  }],
  total_votes: Number 
})

const Polls = mongoose.model('Polls', schema)

module.exports = Polls
