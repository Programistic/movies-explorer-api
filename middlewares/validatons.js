const { celebrate, Joi } = require('celebrate');
const validator = require('validator');

const validateUserBody = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
    name: Joi.string().required().min(2).max(30),
  }),
});

const validateAuthentication = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
});

const validateUserBodyWhenUpdate = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    name: Joi.string().required().min(2).max(30),
  }),
});

const validateMovieBody = celebrate({
  body: Joi.object().keys({
    movieId: Joi.number().required(),
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.number().required(),
    year: Joi.string().required(),
    description: Joi.string().required(),
    image: Joi.string().required().custom((value) => {
      if (validator.isURL(value)) {
        return value;
      }
      return null;
    }),
    trailer: Joi.string().required().custom((value) => {
      if (validator.isURL(value)) {
        return value;
      }
      return null;
    }),
    thumbnail: Joi.string().required().custom((value) => {
      if (validator.isURL(value)) {
        return value;
      }
      return null;
    }),
    nameRU: Joi.string().required(),
    nameEN: Joi.string().required(),
  }),
});

const validateMovieId = celebrate({
  params: Joi.object().keys({
    movieId: Joi.number(),
  }),
});

module.exports = {
  validateUserBody,
  validateAuthentication,
  validateUserBodyWhenUpdate,
  validateMovieBody,
  validateMovieId,
};
