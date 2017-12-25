const mongoose = require('mongoose');

const matchListSchema = mongoose.Schema({
  matchId: {
    type: String,
    required: true,
  },
});

const MatchList = mongoose.model('MatchList', matchListSchema);

module.exports = { MatchList };
