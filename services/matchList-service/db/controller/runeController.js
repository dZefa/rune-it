const mongoose = require('mongoose');
const bluebird = require('bluebird');
const axios = require('axios');

const { MatchList } = require('../models/matchList');
const { Rune } = require('../models/rune');
const log = require('../../lib/log');

// Promisify mongoose queries
mongoose.Promise = bluebird;

const checkMatchList = async (id) => {
  try {
    const matchCheck = await MatchList.findOne({ matchId: id });

    if (!matchCheck) {
      const addMatch = 
    }
  } catch (err) {
    log(`Error in checkList: ${err}`);
    return err;
  }
};

module.exports = { checkMatchList };
