const express = require('express');

const { getChamps } = require('../../lib/riotCalls');

const router = express.Router();

router.route('/getChamps')
  .get(getChamps);

module.exports = { router };
