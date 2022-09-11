require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const DB_CONN = 'mongodb://localhost:27017/bitfilmsdb';

const { PORT = 3001 } = process.env;

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect(DB_CONN, {
  useNewUrlParser: true,
});

app.use(requestLogger);

app.use(errorLogger);

app.listen(PORT);
