const mongoose = require('mongoose');
const isEmail = require('validator/lib/isEmail');

const userSchema = new mongoose.Schema({
  // email пользователя
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: (v) => isEmail(v),
      message: 'Неверный формат электронной почты!',
    },
  },
  // хеш пароля пользователя (хеш пароля? поведение по умолчанию?)
  password: {
    type: String,
    required: true,
    select: false,
  },
  // имя пользователя
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
});

module.exports = mongoose.model('user', userSchema);
