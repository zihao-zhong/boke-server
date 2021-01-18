const dev = require('./config-dev');
const prod = require('./config-prod');

module.exports = (() => {
  let config = {};
  switch (process.env.NODE_ENV) {
    case 'production':
      config = prod;
      break;
    default:
      config = dev;
      break;
  }
  return config;
})();