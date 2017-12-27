const express = require('express');
const path = require('path');
const fs = require('fs');
const cors = require('cors');
const Dotenv = require('dotenv');

const db = require('./db/index');
const log = require('./lib/log');

// Initialize environment variables
Dotenv.config({ path: path.resolve(__dirname, 'matchList.env')});

// Initialize ExpressJS & Port
const app = express();
const PORT = process.env.PORT;

// Initialize Middleware
app.use(cors());

// Initialize Service
app.post('/updateRunes', )

app.listen(PORT, () => {
  log(`MatchList-Service server is listening on port: ${PORT}`);
});
