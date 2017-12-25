const mongoose = require('mongoose');

const summonerSchema = mongoose.Schema({
  summonerName: {
    type: String,
    required: true,
  },
  summonerId: {
    type: String,
    required: true,
  },
  profileIconId: {
    type: String,
    required: true,
  },
  riotAccId: {
    type: String,
    required: true,
  }
});

const Summoner = mongoose.model('Summoner', summonerSchema);

module.exports = { Summoner };
