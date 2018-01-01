const axios = require('axios');
const Promise = require('bluebird');

const log = require('./log');
const { updateMatchLists } = require('../db/controller/runeController');

// Begins the update and calls upon multiple methods
const updateMatch = (req, res) => {
  getChallengerSumId()
    .then((playerIds) => {
      let accountIds = [];
      playerIds.forEach(async (id) => {
        try {
          let accId = await getAccountId(id);
          accountIds.push(accId);
        } catch (err) {
          log(`Error in getting each accId. Error: ${err}`);
        }
      });

      setTimeout(() => {
        const matchHist = {};
        log(`Account Ids: ${accountIds}`);
        accountIds.forEach(async (id) => {
          let matchHistList = await getMatchHist(id);

          matchHistList.forEach(match => {
            matchHist[match] ? null : matchHist[match] = id;
          });
        });

        setTimeout(() => {
          log(`Match History Ids: ${JSON.stringify(matchHist)}`);
          let matchList = Object.keys(matchHist);

          updateMatchLists(matchList);
          res.status(202).send(`Now updating Match and Rune Lists`);
        }, 2000);
      }, 1000);
    })
    .catch(err => {
      log(`Error in updateMatch: getChallengerSumId. Error: ${err}`);
      res.status(500).send(err);
    });
};

// Grabs all challenger SUMMONER ids
const getChallengerSumId = () => {
  return new Promise((resolve, reject) => {
    axios({
      url: `${process.env.RIOT_URL}/league/v3/challengerleagues/by-queue/RANKED_SOLO_5x5`,
      method: 'get',
      headers: {
        'X-Riot-Token': `${process.env.RIOT_TOKEN}`
      }
    })
      .then(response => {
        let result = [];
        for(let i = 0; i < 10; i++) {
          result.push(response.data.entries[i].playerOrTeamId);
        }
        log(`Done grabbing challenger summoner Ids: ${result}`);
        resolve(result);
      })
      .catch(err => {
        log(`Error grabbing challenger accounts from Riot: ${err}`);
        if (err.response.status !== 429) {
          reject(err);
        }
      });
  });
};

// Uses challenger SUMMONER ids to get their respective ACCOUNT ids
const getAccountId = (accId) => {
  return new Promise((resolve, reject) => {
    axios({
      url: `${process.env.RIOT_URL}/summoner/v3/summoners/${accId}`,
      method: 'get',
      headers: {
        'X-Riot-Token': `${process.env.RIOT_TOKEN}`
      }
    })
      .then(response => {
        resolve(response.data.accountId);
      })
      .catch(err => {
        log(`Error getting account Id: ${err}`);
        if (err.response.status !== 429) {
          reject(err);
        }
      });
  });
};

// Gets their 10 recent RANKED SOLO games using ACCOUNT ids
const getMatchHist = (id) => {
  return new Promise((resolve, reject) => {
    axios({
      url: `${process.env.RIOT_URL}/match/v3/matchlists/by-account/${id}`,
      method: 'get',
      headers: {
        'X-Riot-Token': `${process.env.RIOT_TOKEN}`
      },
      params: {
        queue: 420,
        endIndex: 5
      }
    })
      .then(response => {
        let result = response.data.matches.map(match => {
          return match.gameId;
        });
        log(`This is result from match hist: ${result}`);
        resolve(result);
      })
      .catch(err => {
        log(`Error getting Match history: ${err}`)
        if (err.response.status !== 429) {
          reject(err);
        }
      });
  });
};

module.exports = { updateMatch };