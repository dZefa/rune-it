const express = require('express');
const path = require('path');
const fs = require('fs');
const cors = require('cors');
const bodyParser = require('body-parser');
const Morgan = require('morgan');
const Dotenv = require('dotenv');

const db = require('./db/index');

// Initialize environment variables
Dotenv.config({ path: path.resolve(__dirname, 'server.env')});

// Initialize ExpressJS & Port
const app = express();
const PORT = process.env.PORT;

// Initialize Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(Morgan());

// Serve static files
app.use('/', express.static(path.resolve(__dirname, '../client/dist')));
app.use('*', (req, res) => {
  fs.readFile(path.resolve(__dirname, '../client/dist/index.html'));
});

app.listen(PORT, () => {
  console.log(`Server is listening on port: ${PORT}`);
});
