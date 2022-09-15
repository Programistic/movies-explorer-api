const signup = require('express').Router();
const { validateUserBody } = require('../middlewares/validatons');
const { createUser } = require('../controllers/users');

signup.post('/signup', validateUserBody, createUser);

module.exports = signup;
