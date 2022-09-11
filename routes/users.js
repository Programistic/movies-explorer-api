const userRouter = require('express').Router();
const { celebrate, Joi, Segments } = require('celebrate');
const {
  getCurrentUser,
  getUserByIdAndUpdate,
} = require('../controllers/users');

userRouter.get('/me', getCurrentUser);
userRouter.patch(
  '/me',
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      email: Joi.string().required().email(),
      name: Joi.string().required().min(2).max(30),
      password: Joi.string().required(),
    }),
  }),
  getUserByIdAndUpdate,
);

module.exports = userRouter;
