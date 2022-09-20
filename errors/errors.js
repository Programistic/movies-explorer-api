const NotFoundError = require('./NotFoundError');
const AuthError = require('./AuthError');
const RequestError = require('./RequestError');
const ConflictError = require('./ConflictError');
const UnauthRequestError = require('./UnauthRequestError');
const {
  userNotFound,
  sendIncorrectData,
  emailExists,
  authRequired,
  deletedMovieNotFound,
  noRightsToDelete,
} = require('../constants/messages');

const handleUserNotFound = (user, res) => {
  if (!user) {
    throw new NotFoundError(userNotFound);
  } else {
    res.send({ user });
  }
};

const handleConflictError = (err, next) => {
  if (err.name === 'ValidationError' || err.name === 'CastError') {
    next(new RequestError(sendIncorrectData));
  } else if (err.code === 11000 || err.name === 'MongoError') {
    next(new ConflictError(emailExists));
  } else {
    next(err);
  }
};

const handleAuthError = () => {
  throw new AuthError(authRequired);
};

const handleError = (err, next) => {
  if (err.name === 'ValidationError' || err.name === 'CastError') {
    next(new RequestError(sendIncorrectData));
  } else {
    next(err);
  }
};

const handleDeleteMovieFound = (movie) => {
  if (!movie) {
    throw new NotFoundError(deletedMovieNotFound);
  }
};

const handleCheckMovieOwner = (movie, req) => {
  if (req.user._id !== movie.owner.toString()) {
    throw new UnauthRequestError(noRightsToDelete);
  }
};

module.exports = {
  handleUserNotFound,
  handleConflictError,
  handleAuthError,
  handleError,
  handleDeleteMovieFound,
  handleCheckMovieOwner,
};
