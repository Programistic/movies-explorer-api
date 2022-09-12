require('dotenv').config();
const express = require('express');
const { errors } = require('celebrate');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const handleServerError = require('./middlewares/handleServerError');
const userRouter = require('./routes/users');
const moviesRouter = require('./routes/movies');
const NotFoundError = require('./errors/NotFoundError');

const DB_CONN = 'mongodb://localhost:27017/bitfilmsdb';

const { PORT = 3001 } = process.env;

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect(DB_CONN, {
  useNewUrlParser: true,
});

app.use(requestLogger);

app.use('/users', userRouter);
app.use('/movies', moviesRouter);

app.use((req, res, next) => {
  next(new NotFoundError('Ресурс не найден!'));
});

app.use(errorLogger);
app.use(errors);
app.use(handleServerError);

app.listen(PORT);
