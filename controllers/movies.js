const Movie = require('../models/movie');
const {
  handleDeleteMovieFound,
  handleError,
  handleCheckMovieOwner,
} = require('../errors/errors');

const getAllSavedMovies = (req, res, next) => {
  Movie.find({})
    .then((movie) => res.send({ movie })) // сделать фильтрацию фильмов по владельцу аккаунта
    .catch((err) => {
      handleError(err, next);
    });
};

const createMovie = (req, res, next) => {
  Movie.create({
    owner: req.user._id,
    movieId: req.body.movieId,
    country: req.body.country,
    director: req.body.director,
    duration: req.body.duration,
    year: req.body.year,
    description: req.body.description,
    image: req.body.image,
    trailer: req.body.trailer,
    thumbnail: req.body.thumbnail,
    nameRU: req.body.nameRU,
    nameEN: req.body.nameEN,
  })
    .then((movie) => res.send({ movie }))
    .catch((err) => {
      handleError(err, next);
    });
};

const deleteSavedMovieById = (req, res, next) => {
  const { _id } = req.params;
  Movie.findById(_id)
    .then((movie) => {
      handleDeleteMovieFound(movie);
      handleCheckMovieOwner(movie, req);
      Movie.findByIdAndRemove(_id)
        .then((removeMovie) => res.send(removeMovie))
        .catch(next);
    })
    .catch(next);
};

module.exports = {
  getAllSavedMovies,
  createMovie,
  deleteSavedMovieById,
};
