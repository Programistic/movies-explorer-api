const signup = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const { createUser } = require('../controllers/users');

signup.post(
  '/signup',
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().min(2).max(30),
      email: Joi.string().required(),
      password: Joi.string().required(),
    }),
  }),
  createUser,
);

module.exports = signup;
