const mongoose = require('mongoose');
const bluebird = require('bluebird');
const axios = require('axios');

const { MatchList } = require('../models/matchList');
const { Rune } = require('../models/rune');
const { Champion } = require('../models/champion');
const log = require('../../lib/log');
const { createRuneHash } = require('../../lib/createRuneHash');

// Promisify mongoose queries
mongoose.Promise = bluebird;

// Starts update on match and rune list addition
const updateMatchLists = (matchList) => {
  matchList.forEach(async (matchId) => {
    const check = await checkMatchList(matchId);
    setTimeout(() => {
      if (check) {
        addMatchPerSummoner(matchId)
          .then(({ accountIds, participants, error }) => {
            if (error !== 429) {
              log(`This is participants for Match (${matchId}): ${JSON.stringify(accountIds)}`);
              participants.forEach(async (player) => {
                const runeHash = await createRuneHash({ 
                  primaryStyle: player.stats.perkPrimaryStyle,
                  subStyle: player.stats.perkSubStyle,
                  perk0: player.stats.perk0,
                  perk1: player.stats.perk1,
                  perk2: player.stats.perk2,
                  perk3: player.stats.perk3,
                  perk4: player.stats.perk4,
                  perk5: player.stats.perk5,
                });
                if (runeHash !== '') {
                  log(`This is runeHash: ${runeHash}`);
                  await addToRune({
                    matchId: `${matchId}`,
                    championId: `${player.championId}`,
                    accountId: `${accountIds[player.participantId]}`,
                    runeHash: `${runeHash}`,
                    matchResult: player.stats.win
                  });
                }
              });
            }
          })
          .catch(err => {
            log(`Error grabbing results from addMatchPerSummoner. Error: ${err}`);
          });
      }
    }, 1000);
  });
}

// Checks matchIds with database to prevent duplicate data
const checkMatchList = (matchId) => {
  return new Promise(async (resolve, reject) => {
    try {
      const matchCheck = await MatchList.findOne({ matchId: matchId });
      if (!matchCheck) {
        const newMatch = new MatchList({ matchId: matchId });
        await newMatch.save();
        log(`New match added. Matchid: ${matchId}`);
        resolve(true);
      } else {
        resolve(false);
      }
    } catch (err) {
      log(`Error in checkList-matchlist: ${err}`);
      reject(err);
    }
  });
};

// Using non-used MatchIds, grab all summoners and in-game details
const addMatchPerSummoner = (matchId) => {
  return new Promise ((resolve, reject) => {
    axios({
      url: `${process.env.RIOT_URL}/match/v3/matches/${matchId}`,
      method: 'get',
      headers: {
        'X-Riot-Token': `${process.env.RIOT_TOKEN}`
      }
    })
      .then(response => {
        const accountIds = {};
        response.data.participantIdentities.forEach(player => {
          let participantId = player.participantId;
          accountIds[participantId] = player.player.accountId;
        });
        resolve({ accountIds, participants: response.data.participants, error: null });
      })
      .catch(err => {
        log(`Error getting match info from riot. Error: ${err}`);
        if (err.response.status !== 429) {
          reject(err);
        }
        resolve({ error: err.response.status });
      })
  })
};

// Adds new Rune data into database
const addToRune = async (runeObj) => {
  const newRune = new Rune(runeObj);
  log(`This is new Rune: ${newRune}`);
  await newRune.save();
  log(`New Rune added`);
};

module.exports = { updateMatchLists };
