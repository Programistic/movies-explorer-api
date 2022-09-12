const moviesRouter = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const validator = require('validator');
const {
  getAllSavedMovies,
  createMovie,
  deleteSavedMovieById,
} = require('../controllers/movies');

moviesRouter.get('/', getAllSavedMovies);

moviesRouter.post(
  '/',
  celebrate({
    body: Joi.object().keys({
      movieId: Joi.number().required(),
      country: Joi.string().required(),
      director: Joi.string().required(),
      duration: Joi.number().required(),
      year: Joi.string().required(),
      description: Joi.string().required(),
      image: Joi.string().required().custom((value, helper) => {
        if (validator.isURL(value)) {
          return value;
        }
        return helper.message('Некорректный URL-адрес!');
      }),
      trailer: Joi.string().required().custom((value, helper) => {
        if (validator.isURL(value)) {
          return value;
        }
        return helper.message('Некорректный URL-адрес!');
      }),
      thumbnail: Joi.string().required().custom((value, helper) => {
        if (validator.isURL(value)) {
          return value;
        }
        return helper.message('Некорректный URL-адрес!');
      }),
      nameRU: Joi.string().required(),
      nameEN: Joi.string().required(),
    }),
  }),
  createMovie,
);

moviesRouter.delete(
  '/:_id',
  celebrate({
    params: Joi.object().keys({
      _id: Joi.string().hex().length(24),
    }),
  }),
  deleteSavedMovieById,
);

module.exports = moviesRouter;
