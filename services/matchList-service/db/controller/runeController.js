const mongoose = require('mongoose');
const bluebird = require('bluebird');
const axios = require('axios');

const { MatchList } = require('../models/matchList');
const { Rune } = require('../models/rune');
const log = require('../../lib/log');

// Promisify mongoose queries
mongoose.Promise = bluebird;

const checkMatchList = async (matchIds) => {
  const matchList = [];

  try {
    for (let key in matchIds) {
      const matchCheck = await MatchList.findOne({ matchId: key});
      if (!matchCheck) {
        matchList.push(key);
        const newMatch = new MatchList({ matchId: key });
        await newMatch.save();
        log(`New match added. Matchid: ${key}`);
      }
    }
    
  } catch (err) {
    log(`Error in checkList: ${err}`);
    return err;
  }
};

module.exports = { checkMatchList };
