const axios = require('axios');

const log = require('./log');
const { checkMatchList } = require('../db/controller/runeController');

const updateRunes = async (req, res) => {
  let playerIds;
  const matchList = {};

  try {
    playerIds = await getChallengerSumId();
    if (playerIds) {
      playerIds.forEach(id => {
        const accountId = await getAccountId(id);
        if (accountId) {
          const matchHist = await getMatchHist(accountId);
          if (matchHist) {
            matchHist.forEach(match => {
              matchList.match ? null : matchList.match = accountId;
            });
          }
        }
      });
      await checkMatchList(matchList);
      res.status(200).send('Done adding/updating runes and matches');
    }
  } catch (err) {
    log(`Error in updateRunes: ${err}`);
    res.status(400).send(err);
  }
};

const getChallengerSumId = () => {
  axios.get({
    url: `${process.env.RIOT_URL}/league/v3/challengerleagues/by-queue/RANKED_SOLO_5x5`,
    method: 'get',
    headers: {
      'X-Riot-Token': `${process.env.RIOT_TOKEN}`
    }
  })
    .then(response => {
      return response.entries.map(player => {
        return player.playerOrTeamId;
      });
    })
    .catch(err => {
      log(`Error grabbing challenger accounts from Riot: ${err}`);
      return false;
    });
};

const getAccountId = (id) => {
  axios.get({
    url: `${process.env.RIOT_URL}/summoner/v3/summoners/${id}`,
    method: 'get',
    headers: {
      'X-Riot-Token': `${process.env.RIOT_TOKEN}`
    }
  })
    .then(response => {
      return response.id;
    })
    .catch(err => {
      log(`Error getting account Id: ${err}`);
      return false;
    });
};

const getMatchHist = (id) => {
  axios.get({
    url: `${process.env.RIOT_URL}/match/v3/matchlists/by-account/${id}?queue=420&endIndex=20`,
    method: 'get',
    headers: {
      'X-Riot-Token': `${process.env.RIOT_TOKEN}`
    }
  })
    .then(response => {
      return response.matches.map(match => {
        return match.gameId;
      });
    })
    .catch(err => {
      log(`Error getting Match history: ${err}`)
      return false;
    })
};

module.exports = { updateRunes };