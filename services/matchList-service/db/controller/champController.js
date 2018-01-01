const mongoose = require('mongoose');
const bluebird = require('bluebird');
const axios = require('axios');

const { Rune } = require('../models/rune');
const { Champion } = require('../models/champion');
const log = require('../../lib/log');

// Promisify mongoose queries
mongoose.Promise = bluebird;

const updateChampionData = async (req, res) => {
  await Rune.find({ championId: req.body.championId }, (err, data) => {
    if (err) {
      log(`Error grabbing champion in Rune. Error: ${err}`);
      res.status(404).send(err);
    } else {
      log(`This is resulting collection: ${data}`);
      const newChampData = {};
      getBestRune(data)
        .then((bestRune) => {
          if (!bestRune) {
            
          }
        })
    }
  });
};

const getBestRune = (data) => {
  return new bluebird((resolve, reject) => {
    const runeFreq = {};
    data.forEach(game => {
      if (game.matchResult) {
        runeStorage[game.runeHash] ? runeStorage[game.runeHash] += 1 : runeStorage[game.runeHash] = 1;
      }
    });
    const tempRuneArr = [];
    for (let key in runeFreq) {
      tempRuneArr.push([key, runeFreq[key]]);
    };
    tempRuneArr.sort((a,b) => {
      return b[1] - a[1];
    });
    log(`This is sorted rune list of wins: `)
    if (tempRuneArr.length === 0) {
      return -1;
    }
    return tempRuneArr[0][0];
  });
};

const updateChampion = (champData) => {
  return new bluebird((resolve, reject) => {

  });
};

module.exports = { updateChampionData };