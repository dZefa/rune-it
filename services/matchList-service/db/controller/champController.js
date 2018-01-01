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
      const newChampData = {
        championId: req.body.championId,
        totalGames: data.length
      };
      getBestRune(data)
        .then((best) => {
          newChampData.bestRune = best.rune;
          newChampData.bestWR = `${best.wr}`;
          log(`This is newChampData after getBestRune: ${JSON.stringify(newChampData)}`);
          getPopRune(data)
            .then((popular) => {
              newChampData.popularRune = popular.rune;
              newChampData.popularWR = `${popular.wr}`;
              log(`This is newChampData after getPopRune: ${JSON.stringify(newChampData)}`);
              updateChampion(newChampData)
                .then(isNew => {
                  if (isNew) {
                    res.status(201).send('New Champion added to database');
                  } else {
                    res.status(200).send('Champion data updated');
                  }
                })
                .catch(err => {
                  log(`Error in updateChampion. Error: ${err}`);
                  res.status(500).send(err);
                });
            })
            .catch(err => {
              log(`Error in getPopRune. Error: ${err}`);
              res.status(500).send(err);
            });
        })
        .catch(err => {
          log(`Error in getBestRune. Error: ${err}`);
          res.status(500).send(err);
        });
    }
  });
};

// Gets best rune based on WR
const getBestRune = (data) => {
  return new bluebird((resolve, reject) => {
    const runeFreq = {};
    let counter = 0;
    data.forEach(game => {
      if (game.matchResult) {
        runeFreq[game.runeHash] = runeFreq[game.runeHash] ? runeFreq[game.runeHash] + 1 : 1;
        counter++;
      }
    });
    const tempRuneArr = [];
    for (let key in runeFreq) {
      tempRuneArr.push([key, runeFreq[key]]);
    }
    tempRuneArr.sort((a,b) => {
      return b[1] - a[1];
    });
    log(`This is sorted best rune list: ${tempRuneArr}`)
    if (tempRuneArr.length === 0) {
      resolve({ rune: '', wr: 0 });
    } else {
      let wr = counter/data.length;
      resolve({ rune: tempRuneArr[0][0], wr });
    }
  });
};

// Gets most popular rune disregarding WR
const getPopRune = (data) => {
  return new bluebird((resolve, reject) => {
    const runeFreq = {};
    let counter = 0;
    data.forEach(game => {
      if (game.matchResult) {
        counter++;
      }
      runeFreq[game.runeHash] = runeFreq[game.runeHash] ? runeFreq[game.runeHash] + 1 : 1;
    });
    const tempRuneArr = [];
    for(let key in runeFreq) {
      tempRuneArr.push([key, runeFreq[key]]);
    }
    tempRuneArr.sort((a,b) => {
      return b[1] - a[1];
    });
    log(`This is sorted pop rune list: ${tempRuneArr}`);
    if (tempRuneArr.length === 0) {
      resolve({ rune: '', wr: 0 });
    } else {
      let wr = counter/data.length;
      resolve({ rune: tempRuneArr[0][0], wr });
    }
  });
}

const updateChampion = (champData) => {
  return new bluebird(async (resolve, reject) => {
    const champion = await Champion.findOne({ championId: `${champData.championId}`});
    if (!champion) {
      let championName = '';
      await axios({
        url: `${process.env.RIOT_URL}/static-data/v3/champions/${champData.championId}`,
        method: 'get',
        headers: {
          'X-Riot-Token': `${process.env.RIOT_TOKEN}`
        },
        params: {
          'locale': 'en_US',
        }
      })
        .then(response => {
          log(`This is response from Riot in updateChampion: ${JSON.stringify(response.data)}`);
          championName = response.data.name;
          const newChamp = new Champion.create({
            championId: `${champData.championId}`,
            championName,
            popularRune: `${champData.popularRune}`,
            popularWR: `${champData.popularWR}`,
            bestRune: `${champData.bestRune}`,
            bestWR: `${champData.bestWR}`,
            totalGames: `${champData.totalGames}`
          }).save((err, data) => {
            log(`New champion data added to database: ${data}`);
            resolve(true);
          })
        })
        .catch(err => {
          log(`Error getting champion info from Riot. Error: ${err}`);
          if (err.response.status !== 429) {
            reject(err);
          }
        })
    } else {
      await Champion.findOneAndUpdate(
        { 
          championId: `${champData.championId}`
        }, {
          popularRune: `${champData.popularRune}`,
          popularWR: `${champData.popularWR}`,
          bestRune: `${champData.bestRune}`,
          bestWR: `${champData.bestWR}`,
          totalGames: `${champData.totalGames}`
        }, (err, data) => {
          if (err) {
            log(`Error updating champion. Error: ${err}`);
            reject(err);
          } else {
            log(`Champion data updated: ${data}`);
            resolve(false);
          }
        }
      );
    }
  });
};

module.exports = { updateChampionData };