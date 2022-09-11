const appRoot = require('app-root-path');

const URLPattern = /^(https?:\/\/)(www\.)?[a-z\d\D]*/;

const requestLogFilename = `${appRoot}/logs/request.log`;
const errorLogFilename = `${appRoot}/logs/error.log`;

module.exports = {
  URLPattern,
  requestLogFilename,
  errorLogFilename,
};
