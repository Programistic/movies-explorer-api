const userRouter = require('express').Router();
const { validateUserBodyWhenUpdate } = require('../middlewares/validatons');
const {
  getCurrentUser,
  getUserByIdAndUpdate,
} = require('../controllers/users');

userRouter.get('/me', getCurrentUser);
userRouter.patch('/me', validateUserBodyWhenUpdate, getUserByIdAndUpdate);

module.exports = userRouter;
