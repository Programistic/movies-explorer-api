const NotFoundError = require('./NotFoundError');
const AuthError = require('./AuthError');
const RequestError = require('./RequestError');
const ConflictError = require('./ConflictError');

const handleUserNotFound = (user, res) => {
  if (!user) {
    throw new NotFoundError('Пользователь не найден!');
  } else {
    res.send({ user });
  }
};

const handleConflictError = (err, next) => {
  if (err.name === 'ValidationError' || err.name === 'CastError') {
    next(new RequestError('Переданы некорректные данные!'));
  } else if (err.code === 11000 || err.name === 'MongoError') {
    next(new ConflictError('Email уже существует!'));
  } else {
    next(err);
  }
};

const handleAuthError = () => {
  throw new AuthError('Необходима авторизация!');
};

const handleError = (err, next) => {
  if (err.name === 'ValidationError' || err.name === 'CastError') {
    next(new RequestError('Переданы некорректные данные!'));
  } else {
    next(err);
  }
};

module.exports = {
  handleUserNotFound,
  handleConflictError,
  handleAuthError,
  handleError,
};
