const express = require('express');
const path = require('path');
const fs = require('fs');
const cors = require('cors');
const Dotenv = require('dotenv');
const bodyParser = require('body-parser');

// Initialize environment variables
Dotenv.config({ path: path.resolve(__dirname, './matchList.env')});

const db = require('./db/index');
const log = require('./lib/log');
const { updateMatch } = require('./lib/updateMatch');
const { updateChampionData } = require('./db/controller/champController');

// Initialize ExpressJS & Port
const app = express();
const PORT = process.env.PORT;

// Initialize Middleware
app.use(cors());
app.use(bodyParser.json());

// Initialize Service
app.put('/updateMatch', updateMatch);
app.post('/updateChampData', updateChampionData);

app.listen(PORT, () => {
  log(`MatchList-Service server is listening on port: ${PORT}`);
});
