const mongoose = require('mongoose');

const championSchema = mongoose.Schema({
  championId: {
    type: String,
    required: true,
  },
  championName: {
    type: String,
    required: true,
  },
  popularRune: {
    type: String,
    required: false,
  },
  popularWR: {
    type: String,
    required: false,
  },
  bestRune: {
    type: String,
    required: false,
  },
  bestWR: {
    type: String,
    required: false,
  },
});

const Champion = mongoose.model('Champion', championSchema);

module.exports = { Champion }
