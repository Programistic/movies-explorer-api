const { errorOnServer } = require('../constants/messages');

module.exports = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = statusCode === 500 ? errorOnServer : err.message;
  res.status(statusCode).send({ message });
  next();
};
