const appRoot = require('app-root-path');
const rateLimit = require('express-rate-limit');

const requestLogFilename = `${appRoot}/logs/request.log`;
const errorLogFilename = `${appRoot}/logs/error.log`;

const devmoviesdb = 'mongodb://localhost:27017/localmoviesdb';

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
});

module.exports = {
  requestLogFilename,
  errorLogFilename,
  devmoviesdb,
  limiter,
};
