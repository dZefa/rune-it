const Sequelize = require('sequelize');

const db = require('../index');

const Summoner = db.define('summoner', {
  summonerID: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
});

module.exports = Summoner;
