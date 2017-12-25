const express = require('express');
const path = require('path');
const fs = require('fs');
const cors = require('cors');
const bodyParser = require('body-parser');
const Morgan = require('morgan');
const Dotenv = require('dotenv');

const db = require('./db/index');
const log = require('./lib/log');
const router = require('./db/routes/index');

// Initialize environment variables
Dotenv.config({ path: path.resolve(__dirname, 'matchList.env')});

// Initialize ExpressJS & Port
const app = express();
const PORT = process.env.PORT;

// Initialize Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(Morgan());

// Initialize Router
app.use('/api', router);

app.listen(PORT, () => {
  log(`MatchList-Service server is listening on port: ${PORT}`);
});
