require('dotenv').config();
const express = require('express');
const { errors } = require('celebrate');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const handleServerError = require('./middlewares/handleServerError');
const router = require('./routes/index');
const cors = require('./middlewares/cors');
const { limiter, devmoviesdb } = require('./utils/constants');

const { PORT = 3001, DB_CONN, NODE_ENV } = process.env;

const app = express();

app.use(cors);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect(NODE_ENV === 'production' ? DB_CONN : devmoviesdb, {
  useNewUrlParser: true,
});

app.use(requestLogger);

app.use(limiter);

app.use(router);

app.use(errorLogger);
app.use(errors());
app.use(handleServerError);

app.listen(PORT);
