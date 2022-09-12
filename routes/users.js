const userRouter = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const {
  getCurrentUser,
  getUserByIdAndUpdate,
} = require('../controllers/users');

userRouter.get('/me', getCurrentUser);

userRouter.patch(
  '/me',
  celebrate({
    body: Joi.object().keys({
      email: Joi.string().required().email(),
      name: Joi.string().required().min(2).max(30),
    }),
  }),
  getUserByIdAndUpdate,
);

module.exports = userRouter;
