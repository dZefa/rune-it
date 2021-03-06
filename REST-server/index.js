const express = require('express');
const path = require('path');
const fs = require('fs');
const cors = require('cors');
const bodyParser = require('body-parser');
const Morgan = require('morgan');
const Dotenv = require('dotenv');

// Initialize environment variables
Dotenv.config({ path: path.resolve(__dirname, 'server.env')});

const db = require('./db/index');
const log = require('./lib/log');
const { router } = require('./db/routes');

// Initialize ExpressJS & Port
const app = express();
const PORT = process.env.PORT;

// Initialize Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(Morgan());

// Serve routes
app.use('/api', router);

// Serve static files
app.use('/', express.static(path.resolve(__dirname, '../client/dist')));
app.use('*', (req, res) => {
  fs.readFile(path.resolve(__dirname, '../client/dist/index.html'));
});


app.listen(PORT, () => {
  log(`RESTful-server is listening on port: ${PORT}`);
});
