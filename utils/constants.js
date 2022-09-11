const appRoot = require('app-root-path');

const requestLogFilename = `${appRoot}/logs/request.log`;
const errorLogFilename = `${appRoot}/logs/error.log`;

module.exports = {
  requestLogFilename,
  errorLogFilename,
};
