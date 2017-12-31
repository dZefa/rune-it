const log = (...args) => {
  if (process.env.DEBUG === 'TRUE') {
    console.log(...args);
  }
};

module.exports = log;
