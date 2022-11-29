const appRoot = require('app-root-path');
const rateLimit = require('express-rate-limit');

const requestLogFilename = `${appRoot}/logs/request.log`;
const errorLogFilename = `${appRoot}/logs/error.log`;

const devmoviesdb = 'mongodb://localhost:27017/localmoviesdb';

const devKey = '123';

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
});

const DEFAULT_ALLOWED_METHODS = 'GET,HEAD,PUT,PATCH,POST,DELETE';

const allowedCors = [
  'https://localhost:3000',
  'http://localhost:3000',
  'https://localhost:3001',
  'http://localhost:3001',
  'https://films-explorer.nomoredomains.sbs',
  'http://films-explorer.nomoredomains.sbs',
];

module.exports = {
  requestLogFilename,
  errorLogFilename,
  devmoviesdb,
  devKey,
  limiter,
  DEFAULT_ALLOWED_METHODS,
  allowedCors,
};
