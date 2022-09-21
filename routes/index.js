const router = require('express').Router();
const auth = require('../middlewares/auth');
const userRouter = require('./users');
const moviesRouter = require('./movies');
const { createUser, login } = require('../controllers/users');
const { validateUserBody, validateAuthentication } = require('../middlewares/validatons');
const NotFoundError = require('../errors/NotFoundError');

router.post('/signup', validateUserBody, createUser);

router.post('/signin', validateAuthentication, login);

router.use(auth);

router.use('/users', userRouter);
router.use('/movies', moviesRouter);

router.use((req, res, next) => {
  next(new NotFoundError('Маршрут не найден!'));
});

module.exports = router;
