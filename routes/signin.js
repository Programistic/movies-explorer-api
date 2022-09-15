const signin = require('express').Router();
const { validateAuthentication } = require('../middlewares/validatons');
const { login } = require('../controllers/users');

signin.post('/signin', validateAuthentication, login);

module.exports = signin;
