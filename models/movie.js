const mongoose = require('mongoose');
const validator = require('node-mongoose-validator');
const { incorrectURL } = require('../constants/messages');

const movieSchema = new mongoose.Schema({
  // id фильма, который содержится в ответе сервиса MoviesExplorer
  movieId: {
    type: Number,
    required: true,
  },
  // id пользователя, который сохранил фильм
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  // страна создания фильма
  country: {
    type: String,
    required: true,
  },
  // режиссёр фильма
  director: {
    type: String,
    required: true,
  },
  // длительность фильма
  duration: {
    type: Number,
    required: true,
  },
  // год выпуска фильма
  year: {
    type: String,
    required: true,
  },
  // описание фильма
  description: {
    type: String,
    required: true,
  },
  // ссылка на постер к фильму
  image: {
    type: String,
    required: true,
    validate: validator.isURL({
      protocols: ['http', 'https'],
      require_protocol: true,
      message: incorrectURL,
    }),
  },
  // ссылка на трейлер фильма
  trailerLink: {
    type: String,
    required: true,
    validate: validator.isURL({
      protocols: ['http', 'https'],
      require_protocol: true,
      message: incorrectURL,
    }),
  },
  // ссылка на миниатюрное изображение постера к фильму
  thumbnail: {
    type: String,
    required: true,
    validate: validator.isURL({
      protocols: ['http', 'https'],
      require_protocol: true,
      message: incorrectURL,
    }),
  },
  // название фильма на русском
  nameRU: {
    type: String,
    required: true,
  },
  // название фильма на английском
  nameEN: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('movie', movieSchema);
