const router = require('express').Router();

const {
  getCurrentUser,
  updProfile,
  autologin,
} = require('../controllers/users');
const { userValidate } = require('../middlewares/validation');

router.get('/me', getCurrentUser);
router.get('/autologin', autologin);
router.patch('/me', userValidate, updProfile);

module.exports = router;
