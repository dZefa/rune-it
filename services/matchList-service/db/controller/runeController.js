const mongoose = require('mongoose');
const bluebird = require('bluebird');
const axios = require('axios');

const { MatchList } = require('../models/matchList');
const { Rune } = require('../models/rune');
const log = require('../../lib/log');
const { createRuneHash } = require('../../lib/createRuneHash');

// Promisify mongoose queries
mongoose.Promise = bluebird;

// Checks matchIds with database to prevent duplicate data
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

    matchList.forEach(match => {
      addMatchPerSummoner(match);
    });
    log(`Finished adding new runes and matches`);
  } catch (err) {
    log(`Error in checkList: ${err}`);
    return err;
  }
};

// Using non-used MatchIds, add each summoner w/ their champ + runes into database
const addMatchPerSummoner = async (matchId) => {
  axios.get({
    url: `${process.env.RIOT_URL}/match/v3/matches/${matchId}`,
    method: 'get',
    headers: {
      'X-Riot-Token': `${process.env.RIOT_TOKEN}`
    }
  })
    .then(response => {
      const accountIds = {};
      response.participantIdentities.forEach(player => {
        let participantId = player.participantId;
        accountIds.participantId = player.player.accountId;
      });

      response.participants.forEach(player => {
        let runes = {
          primaryStyle: player.stats.perkPrimaryStyle,
          subStyle: player.stats.perkSubStyle,
          perk0: player.stats.perk0,
          perk1: player.stats.perk1,
          perk2: player.stats.perk2,
          perk3: player.stats.perk3,
          perk4: player.stats.perk4,
          perk5: player.stats.perk5,
        };
        const runeHash = await createRuneHash(runes);
        const newRune = new Rune({
          matchId: `${matchId}`,
          championId: `${player.championId}`,
          accountId: `${accountIds[player.participantId]}`,
          runeHash: `${runeHash}`,
          matchResult: player.stats.win
        });
        await newRune.save();
        log(`New Rune added`);
      });
    })
};

module.exports = { checkMatchList };
