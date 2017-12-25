const mongoose = require('mongoose');

const runeSchema = mongoose.Schema({
  matchId: {
    type: String,
    required: true,
  },
  championId: {
    type: String,
    required: true,
  },
  accountId: {
    type: String,
    required: true,
  },
  runeHash: {
    type: String,
    required: true,
  },
  matchResult: {
    type: String,
    required: true,
  },
});

const Rune = mongoose.model('Rune', runeSchema);

module.exports = { Rune };
