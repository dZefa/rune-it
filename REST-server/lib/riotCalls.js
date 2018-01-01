const axios = require('axios');

const log = require('./log');

const getChamps = (req, res) => {
  axios({
    url: `${process.env.RIOT_URL}/static-data/v3/champions`,
    method: 'get',
    headers: {
      'X-Riot-Token': `${process.env.RIOT_TOKEN}`
    }
  })
    .then(response => {
      let result = [];
      for (let key in response.data.data) {
        const champInfo = {};
        champInfo.name = response.data.data[key].name;
        champInfo.id = response.data.data[key].id;
        result.push(champInfo);
      };
      res.status(200).send({ result });
    })
    .catch(err => {
      log(`Error retrieving champion list from Riot. Error: ${err}`);
      res.status(500).send(err);
    });
};

module.exports = { getChamps };
