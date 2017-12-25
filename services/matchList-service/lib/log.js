const log = (...args) => {
  if (process.env.DEBUG === 'TRUE') {
    console.log(...args);
  }
};

export default log;
