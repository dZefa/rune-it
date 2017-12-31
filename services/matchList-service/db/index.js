const mongoose = require('mongoose');
const log = require('../lib/log');

const uri = `${process.env.MONGO_URL}:${process.env.MONGO_PORT}/${process.env.MONGO_DB_NAME}`;

mongoose.connect(uri);

mongoose.connection.on('connected', () => {
  log(`Mongoose default connection open to ${uri}`);
});

mongoose.connection.on('error', (err) => {
  log(`Mongoose default connection error: ${err}`);
});

mongoose.connection.on('disconnected', () => {
  log(`Mongoose default connection disconnected`);
});

const db = mongoose.connection;

module.exports = db;
