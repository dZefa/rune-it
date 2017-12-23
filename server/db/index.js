const Sequelize = require('sequelize');

const db = new Sequelize(process.env.DB_URL);

db.authenticate()
  .then(() => {
    console.log(`Database has connected successfully`);
  })
  .catch(err => {
    console.log(`Error connecting to database. Error: ${err}`);
  });

module.exports = db;
