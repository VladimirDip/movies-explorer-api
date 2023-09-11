const router = require('express').Router();
const { URL_NOT_FOUND_ERROR_TEXT } = require('../utils/errorConstants');
const userRouters = require('./users');
const moveRouters = require('./movies');
const auth = require('../middlewares/auth');
const { createUser, login, signout } = require('../controllers/users');
const { authValidate, registerValidate } = require('../middlewares/validation');
const NotFoundError = require('../errors/notFoundErrors');

router.post('/signup', registerValidate, createUser);
router.post('/signin', authValidate, login);
router.get('/signout', signout);

router.use(auth);

router.use('/users', userRouters);
router.use('/movies', moveRouters);

router.use('*', (req, _, next) => {
  next(new NotFoundError(`${URL_NOT_FOUND_ERROR_TEXT} ${req.baseUrl}`));
});

module.exports = router;
