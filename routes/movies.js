const moviesRouter = require('express').Router();
const { validateMovieBody, validateMovieId } = require('../middlewares/validatons');
const {
  getAllSavedMovies,
  createMovie,
  deleteSavedMovieById,
} = require('../controllers/movies');

moviesRouter.get('/', getAllSavedMovies);
moviesRouter.post('/', validateMovieBody, createMovie);
moviesRouter.delete('/:_id', validateMovieId, deleteSavedMovieById);

module.exports = moviesRouter;
