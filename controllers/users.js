require('dotenv').config();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/user');
const { handleUserNotFound, handleError, handleConflictError } = require('../errors/errors');
const AuthError = require('../errors/AuthError');

const { NODE_ENV, JWT_KEY } = process.env;

const createUser = (req, res, next) => {
  bcrypt.hash(req.body.password, 10)
    .then((hashPassword) => User.create({
      name: req.body.name,
      email: req.body.email,
      password: hashPassword,
    }))
    .then((user) => res.send({
      name: user.name,
      email: user.email,
    }))
    .catch((err) => {
      handleConflictError(err, next);
    });
};

const getCurrentUser = (req, res, next) => {
  const { _id } = req.user;
  User.findById(_id)
    .then((user) => {
      handleUserNotFound(user, res);
    })
    .catch(next);
};

const getUserByIdAndUpdate = (req, res, next) => {
  const { name } = req.body;
  const { _id } = req.user;
  User.findByIdAndUpdate(_id, { name }, { new: true, runValidators: true })
    .then((user) => {
      handleUserNotFound(user, res);
    })
    .catch((err) => {
      handleError(err, next);
    });
};

const login = (req, res, next) => {
  const { email, password } = req.body;

  User.findOne({ email }).select('+password') //  идентификация по почте
    .then((user) => {
      if (!user) {
        throw new AuthError('Неправильная почта или пароль!');
      }
      return bcrypt.compare(password, user.password) //  аутентификация
        .then((matched) => {
          if (!matched) {
            throw new AuthError('Неправильная почта или пароль!');
          }
          const token = jwt.sign(
            { _id: user._id },
            NODE_ENV === 'production' ? JWT_KEY : '123',
            { expiresIn: '7d' },
          );
          res.send({ message: 'Успешная авторизация!', token });
        });
    })
    .catch(() => {
      next(new AuthError('Ошибка авторизации!'));
    });
};

module.exports = {
  createUser,
  getCurrentUser,
  getUserByIdAndUpdate,
  login,
};
